import type { Note, ScaleNote } from '../types';
import { getPositiveModulo, romanize } from '../utils';

export const notes: Note[] = [
	{ sharpNote: 'C', flatNote: 'C' },
	{ sharpNote: 'C#', flatNote: 'D♭', preferSharp: true },
	{ sharpNote: 'D', flatNote: 'D' },
	{ sharpNote: 'D#', flatNote: 'E♭', preferSharp: false },
	{ sharpNote: 'E', flatNote: 'E' },
	{ sharpNote: 'F', flatNote: 'F' },
	{ sharpNote: 'F#', flatNote: 'G♭', preferSharp: true },
	{ sharpNote: 'G', flatNote: 'G' },
	{ sharpNote: 'G#', flatNote: 'A♭', preferSharp: false },
	{ sharpNote: 'A', flatNote: 'A' },
	{ sharpNote: 'A#', flatNote: 'B♭', preferSharp: false },
	{ sharpNote: 'A', flatNote: 'B' }
];

const diatonicIntervals = [2, 2, 1, 2, 2, 2, 1];

const sumIntervals = (startIndex: number, endIndex: number, intervals: number[]) => {
	let sum = 0;
	for (let i = startIndex; i < endIndex; i++) {
		sum += intervals[getPositiveModulo(i, intervals.length)];
	}
	return sum;
};

type ChordType = 'major' | 'minor' | 'diminished' | 'bizarre';

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

const getDiatonicScale = (startRelativeToIonian: number) => {
	const scale: ScaleNote[] = [];
	for (
		let indexRelativeToStart = 0;
		indexRelativeToStart < diatonicIntervals.length;
		indexRelativeToStart++
	) {
		scale.push({
			semitonesFromRoot: sumIntervals(
				startRelativeToIonian,
				startRelativeToIonian + indexRelativeToStart,
				diatonicIntervals
			),
			label: getNoteLabel(indexRelativeToStart, startRelativeToIonian, diatonicIntervals)
		});
	}
	return scale;
};

export const ionianScale = getDiatonicScale(0);
export const dorianScale = getDiatonicScale(1);
export const phrygianScale = getDiatonicScale(2);
export const lydianScale = getDiatonicScale(3);
export const mixolydianScale = getDiatonicScale(4);
export const aeolianScale = getDiatonicScale(5);
export const locrianScale = getDiatonicScale(6);
console.log(locrianScale);
console.log(aeolianScale);

export const diatonicScales = [
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
