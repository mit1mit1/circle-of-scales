import type { IntervalType, Note, ScaleNote } from '../types';
import { diatonicIntervals, prioritisedIntervalTypes, westernChromaticScale } from './constants';
import { getOrdinalSuffixed, getPositiveModulo, sumIntervals } from './math';

export const getNoteString = (note: Note) => {
	if (note.preferSharp) {
		return note.sharpNote;
	}
	return note.flatNote;
};

export const isInScale = (noteIndex: number, rootNoteIndex: number, scale: ScaleNote[]) => {
	let semitonesFromRoot = getPositiveModulo(
		noteIndex - rootNoteIndex,
		westernChromaticScale.length
	);
	if (semitonesFromRoot < 0) {
		semitonesFromRoot = semitonesFromRoot + westernChromaticScale.length;
	}
	return scale.some((scaleNote) => scaleNote.semitonesFromRoot === semitonesFromRoot);
};

const getDiatonicIntervalType = (diff: number, intervalN: number): IntervalType | undefined => {
	if (diff === 1) {
		// Augmented
		return 'augmented';
	}

	const perfectIntervals = [1, 4, 5];
	if (perfectIntervals.includes(intervalN)) {
		if (diff === 0) {
			// Perfect
			return 'perfect';
		}
		if (diff === -1) {
			// Diminished
			return 'diminished';
		}
	}
	if (diff === 0) {
		// Major
		return 'major';
	}
	if (diff === -1) {
		// Minor
		return 'minor';
	}
	if (diff === -2) {
		// Diminished
		return 'diminished';
	}
};

export const getIntervalName = (intervalType: IntervalType, intervalN: number) => {
	return `${intervalType} ${getOrdinalSuffixed(intervalN)}`;
};

export const getIntervalLabelString = (intervalType: IntervalType, intervalN: number) => {
	if (intervalType === 'augmented') {
		return `A${intervalN}`;
	}

	if (intervalType === 'perfect') {
		return `P${intervalN}`;
	}

	if (intervalType === 'diminished') {
		return `d${intervalN}`;
	}

	if (intervalType === 'major') {
		return `M${intervalN}`;
	}
	if (intervalType === 'minor') {
		return `m${intervalN}`;
	}
};

export const getDiatonicIntervalLabel = (diff: number, intervalIndex: number) => {
	const intervalN = intervalIndex + 1;

	const intervalType = getDiatonicIntervalType(diff, intervalN);
	if (intervalType) {
		return getIntervalLabelString(intervalType, intervalN);
	}
};

export const getAllPossibleIntervalLabels = (semitonesBetweenNotes: number) => {
	const possibleIntervalLabels = [] as {
		intervalType: IntervalType;
		intervalN: number;
	}[];
	let testDiatonicIndex = 0;

	while (testDiatonicIndex < diatonicIntervals.length) {
		const intervalN = testDiatonicIndex + 1;
		const forcedDiatonicDiff =
			semitonesBetweenNotes - sumIntervals(0, testDiatonicIndex, diatonicIntervals);
		const forcedDiatonicIntervalType = getDiatonicIntervalType(forcedDiatonicDiff, intervalN);

		if (forcedDiatonicIntervalType) {
			possibleIntervalLabels.push({
				intervalType: forcedDiatonicIntervalType,
				intervalN
			});
		}
		testDiatonicIndex++;
	}

	return possibleIntervalLabels;
};

export const getIntervalLabel = (scaleNote: ScaleNote, index: number) => {
	const diff = scaleNote.semitonesFromRoot - sumIntervals(0, index, diatonicIntervals);
	const naturalIntervalLabel = getDiatonicIntervalLabel(diff, index);

	if (naturalIntervalLabel) {
		return naturalIntervalLabel;
	}

	const possibleIntervalLabels = getAllPossibleIntervalLabels(scaleNote.semitonesFromRoot);

	for (const intervalType of prioritisedIntervalTypes) {
		for (const intervalDetails of possibleIntervalLabels) {
			if (intervalDetails.intervalType === intervalType) {
				return getIntervalLabelString(intervalDetails.intervalType, intervalDetails.intervalN);
			}
		}
	}

	return `${scaleNote.semitonesFromRoot}s`;
};
