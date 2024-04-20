import type { Note, ScaleNote } from '../types';

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

export const ionianScale: ScaleNote[] = [
	{
		semitonesFromRoot: 0,
		label: 'I'
	},
	{
		semitonesFromRoot: 2,
		label: 'ii'
	},
	{
		semitonesFromRoot: 4,
		label: 'iii'
	},
	{
		semitonesFromRoot: 5,
		label: 'IV'
	},
	{
		semitonesFromRoot: 7,
		label: 'V'
	},
	{
		semitonesFromRoot: 9,
		label: 'vi'
	},
	{
		semitonesFromRoot: 11,
		label: 'vii'
	}
];

