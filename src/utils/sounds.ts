import {
	MINIMUM_BEAT_DIVISION,
	pythagoreanSemitoneRatios,
	westernChromaticScale
} from './constants';
import type { InstrumentSettings, Note, ScaleNote } from '../types';

const DEFAULT_BEAT_DURATION = 300;
const DEFAULT_NOTE_BEATS = 0.75;
const DEFAULT_JAM_LENGTH_BEATS = 8;

const MINIMUM_GAIN = 0.000001;

const firstSynth: InstrumentSettings = {
	attackTime: 0.1,
	decayTime: 0.3,
	releaseTime: 0.5,
	maxSustainTime: 0.2,
	maxGain: 0.1,
	sustainGainRatio: 0.1,
	oscillatorType: 'sine'
};

const getNoteFrequency = (rootNote: Note, semitonesFromRoot: number) => {
	let frequencyMultiplier = 1;
	while (semitonesFromRoot < 0) {
		semitonesFromRoot = semitonesFromRoot + pythagoreanSemitoneRatios.length;
		frequencyMultiplier = frequencyMultiplier * 0.5;
	}
	while (semitonesFromRoot >= pythagoreanSemitoneRatios.length) {
		semitonesFromRoot = semitonesFromRoot - pythagoreanSemitoneRatios.length;
		frequencyMultiplier = frequencyMultiplier * 2;
	}
	frequencyMultiplier = frequencyMultiplier * pythagoreanSemitoneRatios[semitonesFromRoot];
	return rootNote.defaultOctaveFrequency * frequencyMultiplier;
};

export const makeNote = (
	rootNote: Note,
	semitonesFromRoot: number,
	startTimeMilliseconds: number,
	endTimeMilliseconds: number,
	instrumentSettings: Partial<InstrumentSettings> = {}
) => {
	if (endTimeMilliseconds < startTimeMilliseconds) {
		alert('WTF?');
	}
	const instrumentProperties = { ...firstSynth, ...instrumentSettings };
	let { attackTime, decayTime } = { ...instrumentProperties };
	const {
		// release can be after end time
		releaseTime,
		maxSustainTime,
		maxGain,
		sustainGainRatio,
		oscillatorType = 'triangle'
	} = { ...instrumentProperties };
	const sustainGain = maxGain * sustainGainRatio;
	const context = new AudioContext();
	const oscillator = context.createOscillator();
	const volume = context.createGain();
	const compressor = context.createDynamicsCompressor();

	volume.gain.value = 0.001;
	oscillator.type = oscillatorType;
	oscillator.frequency.value = getNoteFrequency(rootNote, semitonesFromRoot);
	oscillator.connect(volume).connect(compressor).connect(context.destination);
	const maxMilliseconds = endTimeMilliseconds - startTimeMilliseconds;
	if (attackTime > maxMilliseconds / (2 * 1000)) {
		attackTime = maxMilliseconds / (2 * 1000);
	}
	if (decayTime + attackTime > maxMilliseconds / 1000) {
		decayTime = maxMilliseconds / 1000 - attackTime;
	}
	let sustainTime = maxSustainTime ?? 10000;
	if (sustainTime > maxMilliseconds / 1000 - attackTime - decayTime) {
		sustainTime = maxMilliseconds / 1000 - attackTime - decayTime;
	}
	setTimeout(function () {
		const endAttackTime = context.currentTime + attackTime;
		volume.gain.exponentialRampToValueAtTime(maxGain, endAttackTime);
		oscillator.start();
		setTimeout(() => {
			volume.gain.exponentialRampToValueAtTime(sustainGain, context.currentTime + decayTime);
			setTimeout(() => {
				volume.gain.exponentialRampToValueAtTime(MINIMUM_GAIN, context.currentTime + releaseTime);
				setTimeout(function () {
					oscillator.stop();
					context.close();
				}, releaseTime * 1000 + 2000);
			}, sustainTime * 1000);
		}, attackTime * 1000);
	}, startTimeMilliseconds);
};

export const playScalePedal = (
	scaleNotes: ScaleNote[],
	rootNoteIndex: number,
	beatDuration = DEFAULT_BEAT_DURATION,
	noteBeatsLength = DEFAULT_NOTE_BEATS
) => {
	const noteDuration = beatDuration * 0.5 * noteBeatsLength;
	const noteGap = beatDuration * 0.5 - noteDuration;
	const noteLength = beatDuration * 0.5;
	[...scaleNotes].forEach((scaleNote, index) => {
		// First note is different because we're pedaling it anyway
		if (index === 0) {
			// Extra long note which is also root note
			makeNote(
				westernChromaticScale[rootNoteIndex],
				scaleNote.semitonesFromRoot,
				index * 2 * noteLength + noteGap,
				index * 2 * noteLength + noteGap + noteDuration + noteLength
			);
		} else {
			// Root note
			makeNote(
				westernChromaticScale[rootNoteIndex],
				0,
				index * 2 * noteLength + noteGap,
				index * 2 * noteLength + noteGap + noteDuration
			);
			// Note
			makeNote(
				westernChromaticScale[rootNoteIndex],
				scaleNote.semitonesFromRoot,
				(index * 2 + 1) * noteLength + noteGap,
				(index * 2 + 1) * noteLength + noteGap + noteDuration
			);
		}
	});
	// Root note
	makeNote(
		westernChromaticScale[rootNoteIndex],
		0,
		scaleNotes.length * 2 * noteLength + noteGap,
		scaleNotes.length * 2 * noteLength + noteGap + noteDuration
	);
	// Octave up note
	makeNote(
		westernChromaticScale[rootNoteIndex],
		westernChromaticScale.length,
		(scaleNotes.length * 2 + 1) * noteLength + noteGap,
		(scaleNotes.length * 2 + 1) * noteLength + noteGap + noteDuration
	);
};

export const playScaleUpDown = (
	scaleNotes: ScaleNote[],
	rootNoteIndex: number,
	beatDuration = DEFAULT_BEAT_DURATION,
	noteBeatsLength = DEFAULT_NOTE_BEATS
) => {
	const noteDuration = beatDuration * 0.5 * noteBeatsLength;
	const noteGap = beatDuration * 0.5 - noteDuration;
	const noteLength = beatDuration * 0.5;

	// Extra long note which is also root note
	makeNote(
		westernChromaticScale[rootNoteIndex],
		scaleNotes[0].semitonesFromRoot,
		noteGap,
		noteLength + noteGap + noteDuration + noteLength
	);
	[...scaleNotes].forEach((scaleNote, index) => {
		makeNote(
			westernChromaticScale[rootNoteIndex],
			scaleNote.semitonesFromRoot,
			(index + 2) * noteLength + noteGap,
			(index + 2) * noteLength + noteGap + noteDuration + noteLength
		);
	});
	// Octave up note
	makeNote(
		westernChromaticScale[rootNoteIndex],
		westernChromaticScale.length,
		(scaleNotes.length + 2) * noteLength + noteGap,
		(scaleNotes.length + 2) * noteLength + noteGap + noteDuration
	);
	[...scaleNotes].reverse().forEach((scaleNote, index) => {
		makeNote(
			westernChromaticScale[rootNoteIndex],
			scaleNote.semitonesFromRoot,
			(index + scaleNotes.length + 3) * noteLength + noteGap,
			(index + scaleNotes.length + 3) * noteLength + noteGap + noteDuration + noteLength
		);
	});
};

export const playScaleDrone = (
	scaleNotes: ScaleNote[],
	rootNoteIndex: number,
	beatDuration = DEFAULT_BEAT_DURATION,
	noteBeatsLength = DEFAULT_NOTE_BEATS
) => {
	const noteDuration = beatDuration * 0.5 * noteBeatsLength;
	const noteGap = beatDuration * 0.5 - noteDuration;
	const noteLength = beatDuration * 0.5;

	makeNote(
		westernChromaticScale[rootNoteIndex],
		0,
		noteGap,
		noteGap + noteLength * (scaleNotes.length * 2 + 3),
		{
			maxSustainTime: noteLength * (scaleNotes.length * 2 + 2),
			oscillatorType: 'sine',
			sustainGainRatio: 0.5,
			maxGain: 0.0125
		}
	);
	[...scaleNotes].forEach((scaleNote, index) => {
		makeNote(
			westernChromaticScale[rootNoteIndex],
			scaleNote.semitonesFromRoot,
			(index + 2) * noteLength + noteGap,
			(index + 2) * noteLength + noteGap + noteDuration + noteLength
		);
	});
	// Octave up note
	makeNote(
		westernChromaticScale[rootNoteIndex],
		westernChromaticScale.length,
		(scaleNotes.length + 2) * noteLength + noteGap,
		(scaleNotes.length + 2) * noteLength + noteGap + noteDuration
	);
	[...scaleNotes].reverse().forEach((scaleNote, index) => {
		makeNote(
			westernChromaticScale[rootNoteIndex],
			scaleNote.semitonesFromRoot,
			(index + scaleNotes.length + 3) * noteLength + noteGap,
			(index + scaleNotes.length + 3) * noteLength + noteGap + noteDuration + noteLength
		);
	});
};

export const jam = (
	scaleNotes: ScaleNote[],
	rootNoteIndex: number,
	melodyProbabilities: number[],
	bassProbabilities: number[],
	beatDuration = DEFAULT_BEAT_DURATION,
	numberOfBeats = DEFAULT_JAM_LENGTH_BEATS
) => {
	let currentMelodyBeat = 0;
	while (currentMelodyBeat <= numberOfBeats) {
		scaleNotes.forEach((scaleNote, index) => {
			if (index >= melodyProbabilities.length) {
				return;
			}
			if (Math.random() < melodyProbabilities[index]) {
				const durationSeed = Math.random();
				let durationMultiplier = 1;
				if (durationSeed > 0.8) {
					durationMultiplier = 2;
				}
				if (durationSeed > 0.9) {
					durationMultiplier = 4;
				}
				if (durationSeed > 0.95) {
					durationMultiplier = 6;
				}
				if (durationSeed > 0.97) {
					durationMultiplier = 3;
				}
				if (durationSeed > 0.99) {
					durationMultiplier = 8;
				}
				makeNote(
					westernChromaticScale[rootNoteIndex],
					scaleNote.semitonesFromRoot + westernChromaticScale.length,
					beatDuration * currentMelodyBeat,
					beatDuration * currentMelodyBeat + beatDuration * MINIMUM_BEAT_DIVISION * durationMultiplier
				);
				currentMelodyBeat += MINIMUM_BEAT_DIVISION;
			}
		});
		currentMelodyBeat += MINIMUM_BEAT_DIVISION;
	}

	let currentBassBeat = 0;

	while (currentBassBeat <= numberOfBeats) {
		scaleNotes.forEach((scaleNote, index) => {
			if (index >= bassProbabilities.length) {
				return;
			}
			if (Math.random() < bassProbabilities[index]) {
				const durationSeed = Math.random();
				let durationMultiplier = 1;
				if (durationSeed > 0.8) {
					durationMultiplier = 2;
				}
				if (durationSeed > 0.9) {
					durationMultiplier = 4;
				}
				if (durationSeed > 0.95) {
					durationMultiplier = 6;
				}
				if (durationSeed > 0.97) {
					durationMultiplier = 3;
				}
				if (durationSeed > 0.99) {
					durationMultiplier = 8;
				}
				makeNote(
					westernChromaticScale[rootNoteIndex],
					scaleNote.semitonesFromRoot,
					beatDuration * currentBassBeat,
					beatDuration * currentBassBeat + beatDuration * 2 * MINIMUM_BEAT_DIVISION * durationMultiplier
				);
				currentBassBeat += 2 * MINIMUM_BEAT_DIVISION;
			}
		});
		currentBassBeat += 2 * MINIMUM_BEAT_DIVISION;
	}
};
