import type { ChordType, ScaleNote, Triad } from '../types';
import { getPositiveModulo, romanize } from './math';
import {
	diatonicIntervals,
	hexatonicMinorBluesIntervals,
	jamBassProbabilityDistributions,
	jamMelodyProbabilityDistributions,
	pentatonicMajorIntervals
} from './constants';

const sumIntervals = (startIndex: number, endIndex: number, intervals: number[]) => {
	let sum = 0;
	for (let i = startIndex; i < endIndex; i++) {
		sum += intervals[getPositiveModulo(i, intervals.length)];
	}
	return sum;
};

export const getTriadTypeFromSemitoneGaps = (
	semitonesFromRootToSecondNote: number,
	semitonesFromRootToThirdNote: number
) => {
	if (semitonesFromRootToSecondNote === 4 && semitonesFromRootToThirdNote === 7) {
		return 'major';
	}
	if (semitonesFromRootToSecondNote === 3 && semitonesFromRootToThirdNote === 7) {
		return 'minor';
	}
	if (semitonesFromRootToSecondNote === 3 && semitonesFromRootToThirdNote === 6) {
		return 'diminished';
	}
	return 'bizarre';
};

export const getTriadTypeFromSelectedScale = (
	rootNoteIndex: number,
	scaleNoteIndex: number,
	selectedScale: ScaleNote[]
) => {
	const scaleNotes = [
		{ ...selectedScale[scaleNoteIndex] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 2, selectedScale.length)] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 4, selectedScale.length)] }
	];
	return getTriadTypeFromSemitoneGaps(
		scaleNotes[1].semitonesFromRoot,
		scaleNotes[1].semitonesFromRoot + scaleNotes[2].semitonesFromRoot
	);
};

const getTriadTypeFromTriad = (triad: Triad): ChordType => {
	return getTriadTypeFromSemitoneGaps(
		triad.firstInterval.semitonesFromRoot,
		triad.secondInterval.semitonesFromRoot
	);
};

export const getTriad = (indexRelativeToIonian: number, intervals: number[]): Triad => {
	return {
		firstInterval: {
			semitonesFromRoot: sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 2, intervals)
		},
		secondInterval: {
			semitonesFromRoot: sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 4, intervals)
		}
	};
};

const getNoteLabel = (
	indexRelativeToStart: number,
	startRelativeToIonian: number,
	intervals: number[]
) => {
	const romanisedIndex = romanize(
		getPositiveModulo(indexRelativeToStart + 1, intervals.length + 1)
	);
	const indexRelativeToIonian = indexRelativeToStart + startRelativeToIonian;
	const chordType = getTriadTypeFromTriad(getTriad(indexRelativeToIonian, intervals));
	if (chordType === 'major') {
		return romanisedIndex;
	}
	if (chordType === 'minor') {
		return romanisedIndex.toLowerCase();
	}
	if (chordType === 'diminished') {
		return `${romanisedIndex.toLowerCase()}°`;
	}
	return romanisedIndex;
};

const getScale = (startRelativeToIonian: number, intervals: number[]) => {
	const scale: ScaleNote[] = [];
	for (
		let indexRelativeToStart = 0;
		indexRelativeToStart < intervals.length;
		indexRelativeToStart++
	) {
		scale.push({
			semitonesFromRoot: sumIntervals(
				startRelativeToIonian,
				startRelativeToIonian + indexRelativeToStart,
				intervals
			),
			label: getNoteLabel(indexRelativeToStart, startRelativeToIonian, intervals)
		});
	}
	return scale;
};

export const getDiatonicIntervalLabel = (diff: number, intervalIndex: number) => {
	const intervalN = intervalIndex + 1;

	if (diff === 1) {
		// Augmented
		return `A${intervalN}`;
	}

	const perfectIntervals = [1, 4, 5];
	if (perfectIntervals.includes(intervalN)) {
		if (diff === 0) {
			// Perfect
			return `P${intervalN}`;
		}
		if (diff === -1) {
			// Diminished
			return `d${intervalN}`;
		}
	}
	if (diff === 0) {
		// Major
		return `M${intervalN}`;
	}
	if (diff === -1) {
		// Minor
		return `m${intervalN}`;
	}
	if (diff === -2) {
		// Diminished
		return `d${intervalN}`;
	}
};

export const getIntervalLabel = (scaleNote: ScaleNote, index: number) => {
	const diff = scaleNote.semitonesFromRoot - sumIntervals(0, index, diatonicIntervals);
	const diatonicIntervalLabel = getDiatonicIntervalLabel(diff, index);

	if (diatonicIntervalLabel) {
		return diatonicIntervalLabel;
	}

	let testDiatonicIndex = 0;

	while (testDiatonicIndex < diatonicIntervals.length) {
		const forcedDiatonicDiff =
			scaleNote.semitonesFromRoot - sumIntervals(0, testDiatonicIndex, diatonicIntervals);
		const forcedDiatonicIntervalLabel = getDiatonicIntervalLabel(
			forcedDiatonicDiff,
			testDiatonicIndex
		);

		if (forcedDiatonicIntervalLabel) {
			return forcedDiatonicIntervalLabel;
		}
		testDiatonicIndex++;
	}

	return `${scaleNote.semitonesFromRoot}s`;
};

export const ionianScale = getScale(0, diatonicIntervals);
export const dorianScale = getScale(1, diatonicIntervals);
export const phrygianScale = getScale(2, diatonicIntervals);
export const lydianScale = getScale(3, diatonicIntervals);
export const mixolydianScale = getScale(4, diatonicIntervals);
export const aeolianScale = getScale(5, diatonicIntervals);
export const locrianScale = getScale(6, diatonicIntervals);

export const diatonicModes = [
	{
		name: 'Ionian / Major',
		scale: ionianScale,
		rootIntervalToIonian: sumIntervals(0, 0, diatonicIntervals)
	},
	{
		name: 'Dorian',
		scale: dorianScale,
		rootIntervalToIonian: sumIntervals(0, 1, diatonicIntervals)
	},
	{
		name: 'Phrygian',
		scale: phrygianScale,
		rootIntervalToIonian: sumIntervals(0, 2, diatonicIntervals)
	},
	{
		name: 'Lydian',
		scale: lydianScale,
		rootIntervalToIonian: sumIntervals(0, 3, diatonicIntervals)
	},
	{
		name: 'Mixolydian',
		scale: mixolydianScale,
		rootIntervalToIonian: sumIntervals(0, 4, diatonicIntervals)
	},
	{
		name: 'Aeolian / Natural Minor',
		scale: aeolianScale,
		rootIntervalToIonian: sumIntervals(0, 5, diatonicIntervals)
	},
	{
		name: 'Locrian',
		scale: locrianScale,
		rootIntervalToIonian: sumIntervals(0, 6, diatonicIntervals)
	}
];

export const majorPentatonic = getScale(0, pentatonicMajorIntervals);
export const suspendedPentatonic = getScale(1, pentatonicMajorIntervals);
export const bluesMinorPentatonic = getScale(2, pentatonicMajorIntervals);
export const bluesMajorPentatonic = getScale(3, pentatonicMajorIntervals);
export const minorPentatonic = getScale(4, pentatonicMajorIntervals);

export const majorPentatonicModes = [
	{
		name: 'Major',
		scale: majorPentatonic,
		rootIntervalToIonian: sumIntervals(0, 0, pentatonicMajorIntervals)
	},
	{
		name: 'Suspended / Egyptian',
		scale: suspendedPentatonic,
		rootIntervalToIonian: sumIntervals(0, 1, pentatonicMajorIntervals)
	},
	{
		name: 'Blues minor / Man Gong',
		scale: bluesMinorPentatonic,
		rootIntervalToIonian: sumIntervals(0, 2, pentatonicMajorIntervals)
	},
	{
		name: 'Blues major',
		scale: bluesMajorPentatonic,
		rootIntervalToIonian: sumIntervals(0, 3, pentatonicMajorIntervals)
	},
	{
		name: 'Minor',
		scale: minorPentatonic,
		rootIntervalToIonian: sumIntervals(0, 4, pentatonicMajorIntervals)
	}
];

export const hexatonicMinorBlues = getScale(0, hexatonicMinorBluesIntervals);
export const hexatonicMajorBlues = getScale(1, hexatonicMinorBluesIntervals);
export const blues3 = getScale(2, hexatonicMinorBluesIntervals);
export const blues4 = getScale(3, hexatonicMinorBluesIntervals);
export const blues5 = getScale(4, hexatonicMinorBluesIntervals);
export const blues6 = getScale(5, hexatonicMinorBluesIntervals);

export const minorHexatonicBluesModes = [
	{
		name: 'Minor',
		scale: hexatonicMinorBlues,
		rootIntervalToIonian: sumIntervals(0, 0, hexatonicMinorBluesIntervals)
	},
	{
		name: 'Major',
		scale: hexatonicMajorBlues,
		rootIntervalToIonian: sumIntervals(0, 1, hexatonicMinorBluesIntervals)
	}
];

export const modeGroups = [
	{
		label: 'Diatonic',
		modes: diatonicModes,
		probabilityDistributions: {
			bass: jamBassProbabilityDistributions.diatonic,
			melody: jamMelodyProbabilityDistributions.diatonic
		}
	},
	{
		label: 'Pentatonic',
		modes: majorPentatonicModes,
		probabilityDistributions: {
			bass: jamBassProbabilityDistributions.pentatonic,
			melody: jamMelodyProbabilityDistributions.pentatonic
		}
	},
	{
		label: 'Hexatonic (blues)',
		modes: minorHexatonicBluesModes,
		probabilityDistributions: {
			bass: jamBassProbabilityDistributions.hexatonic,
			melody: jamMelodyProbabilityDistributions.hexatonic
		}
	}
];
