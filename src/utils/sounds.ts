import { pythagoreanSemitoneRatios, westernChromaticScale } from './constants';
import type { Note, ScaleNote, SynthType } from '../types';

const DEFAULT_BEAT_DURATION = 300;
const DEFAULT_NOTE_BEATS = 0.75;

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
	startTime: number,
	endTime: number,
	attackTime = 0.05,
	decayTime = 0.5,
	decayStartTime = 0,
	maxGain = 0.1,
	oscillatorType: SynthType = 'triangle',
) => {
	const context = new AudioContext();
	const oscillator = context.createOscillator();
	const volume = context.createGain();
	const compressor = context.createDynamicsCompressor();

	volume.gain.value = 0.001;
	oscillator.type = oscillatorType;
	oscillator.frequency.value = getNoteFrequency(rootNote, semitonesFromRoot);
	oscillator.connect(volume).connect(compressor).connect(context.destination);

	setTimeout(function () {
		volume.gain.exponentialRampToValueAtTime(maxGain, context.currentTime + attackTime);
		setTimeout(() => {
			volume.gain.exponentialRampToValueAtTime(
				0.00001,
				context.currentTime + (endTime - startTime) / 1000 + decayTime
			);
		}, decayStartTime);
		oscillator.start();
	}, startTime);
	setTimeout(function () {
		oscillator.stop();
		context.close();
	}, endTime + 2000 + decayTime * 1000);
};

export const playScalePedal = (
	scaleNotes: ScaleNote[],
	rootNoteIndex: number,
	beatDuration = DEFAULT_BEAT_DURATION,
	noteBeatsLength = DEFAULT_NOTE_BEATS
) => {
	const noteDuration = beatDuration * noteBeatsLength;
	const noteGap = beatDuration - noteDuration;
	const noteLength = beatDuration;
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
	const noteDuration = beatDuration * noteBeatsLength;
	const noteGap = beatDuration - noteDuration;
	const noteLength = beatDuration;

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
	noteBeatsLength = DEFAULT_NOTE_BEATS,
) => {
	const noteDuration = beatDuration * noteBeatsLength;
	const noteGap = beatDuration - noteDuration;
	const noteLength = beatDuration;

	makeNote(
		westernChromaticScale[rootNoteIndex],
		0,
		noteGap,
		noteGap + noteLength * (scaleNotes.length * 2 + 3),
		0.1,
		0.2,
		noteLength * (scaleNotes.length * 2 + 2),
		0.025,
		"sine"
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
