import type { Note } from '../types';

export const westernChromaticScale: Note[] = [
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

export const diatonicIntervals = [2, 2, 1, 2, 2, 2, 1];
export const pentatonicMajorIntervals = [2, 2, 3, 2, 3];
