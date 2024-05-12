import type { Note } from '../types';

export const westernChromaticScale: Note[] = [
	{ sharpNote: 'C', flatNote: 'C', defaultOctaveFrequency: 261.63 },
	{ sharpNote: 'C#', flatNote: 'D♭', preferSharp: true, defaultOctaveFrequency: 277.18 },
	{ sharpNote: 'D', flatNote: 'D', defaultOctaveFrequency: 293.66 },
	{ sharpNote: 'D#', flatNote: 'E♭', preferSharp: false, defaultOctaveFrequency: 311.13 },
	{ sharpNote: 'E', flatNote: 'E', defaultOctaveFrequency: 329.63 },
	{ sharpNote: 'F', flatNote: 'F', defaultOctaveFrequency: 349.23 },
	{ sharpNote: 'F#', flatNote: 'G♭', preferSharp: true, defaultOctaveFrequency: 185.0 },
	{ sharpNote: 'G', flatNote: 'G', defaultOctaveFrequency: 196.0 },
	{ sharpNote: 'G#', flatNote: 'A♭', preferSharp: false, defaultOctaveFrequency: 207.65 },
	{ sharpNote: 'A', flatNote: 'A', defaultOctaveFrequency: 220 },
	{ sharpNote: 'A#', flatNote: 'B♭', preferSharp: false, defaultOctaveFrequency: 233.08 },
	{ sharpNote: 'A', flatNote: 'B', defaultOctaveFrequency: 246.94 }
];

export const diatonicIntervals = [2, 2, 1, 2, 2, 2, 1];
export const pentatonicMajorIntervals = [2, 2, 3, 2, 3];

export const pythagoreanSemitoneRatios = [
	1,
	256 / 243,
	9 / 8,
	32 / 27,
	81 / 64,
	4 / 3,
	1024 / 729,
	3 / 2,
	128 / 81,
	27 / 16,
	16 / 9,
	243 / 128
];

export const jamMelodyProbabilityDistributions = {
	pentatonic: [0.3, 0.05, 0.05, 0.2, 0.1],
	diatonic: [0.3, 0.05, 0.15, 0.05, 0.075, 0.05, 0.03]
};

export const jamBassProbabilityDistributions = {
	pentatonic: [0.5, 0.05, 0.15, 0.2, 0.05],
	diatonic: [0.5, 0.02, 0.05, 0.1, 0.1, 0.05, 0.02]
};

export const MINIMUM_BEAT_DIVISION = 0.25;
