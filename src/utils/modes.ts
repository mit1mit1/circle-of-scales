import type { ChordType, ScaleNote } from '../types';
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

const getChordType = (firstInterval: number, secondInterval: number): ChordType => {
	if (firstInterval === 4 && secondInterval === 7) {
		return 'major';
	}
	if (firstInterval === 3 && secondInterval === 7) {
		return 'minor';
	}
	if (firstInterval === 3 && secondInterval === 6) {
		return 'diminished';
	}
	return 'bizarre';
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
	const chordType = getChordType(
		sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 2, intervals),
		sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 4, intervals)
	);
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

export const getIntervalLabel = (scaleNote: ScaleNote, index: number) => {
	const intervalLabel = index + 1;

	const diff = scaleNote.semitonesFromRoot - sumIntervals(0, index, diatonicIntervals);
	if (diff === 1) {
		// Augmented
		return `A${intervalLabel}`;
	}

	const perfectIntervals = [1, 4, 5];
	if (perfectIntervals.includes(intervalLabel)) {
		if (diff === 0) {
			// Perfect
			return `P${intervalLabel}`;
		}
		if (diff === -1) {
			// Diminished
			return `d${intervalLabel}`;
		}
	}
	if (diff === 0) {
		// Major
		return `M${intervalLabel}`;
	}
	if (diff === -1) {
		// Minor
		return `m${intervalLabel}`;
	}
	if (diff === -2) {
		// Diminished
		return `d${intervalLabel}`;
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
	},
	{
		name: 'Weird 3',
		scale: blues3,
		rootIntervalToIonian: sumIntervals(0, 2, hexatonicMinorBluesIntervals)
	},
	{
		name: 'Weird 4',
		scale: blues4,
		rootIntervalToIonian: sumIntervals(0, 3, hexatonicMinorBluesIntervals)
	},
	{
		name: 'Weird 5',
		scale: blues5,
		rootIntervalToIonian: sumIntervals(0, 4, hexatonicMinorBluesIntervals)
	},
	{
		name: 'Weird 6',
		scale: blues6,
		rootIntervalToIonian: sumIntervals(0, 5, hexatonicMinorBluesIntervals)
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
		label: '(Major) Pentatonic',
		modes: majorPentatonicModes,
		probabilityDistributions: {
			bass: jamBassProbabilityDistributions.pentatonic,
			melody: jamMelodyProbabilityDistributions.pentatonic
		}
	},
	{
		label: '(Minor) Blues',
		modes: minorHexatonicBluesModes,
		probabilityDistributions: {
			bass: jamBassProbabilityDistributions.hexatonic,
			melody: jamMelodyProbabilityDistributions.hexatonic
		}
	}
];
