import type { IntervalType, Note } from '../types';

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

export const WesternAFrequency = 220;

export const mitchsSixteenthScale: Note[] = [
	{ sharpNote: 'h', flatNote: 'h', defaultOctaveFrequency: WesternAFrequency },
	{
		sharpNote: 'i',
		flatNote: 'i',
		preferSharp: true,
		defaultOctaveFrequency: (WesternAFrequency * 17) / 16
	},
	{ sharpNote: 'j', flatNote: 'j', defaultOctaveFrequency: (WesternAFrequency * 18) / 16 },
	{
		sharpNote: 'k',
		flatNote: 'k',
		preferSharp: false,
		defaultOctaveFrequency: (WesternAFrequency * 19) / 16
	},
	{ sharpNote: 'l', flatNote: 'l', defaultOctaveFrequency: (WesternAFrequency * 20) / 16 },
	{ sharpNote: 'm', flatNote: 'm', defaultOctaveFrequency: (WesternAFrequency * 21) / 16 },
	{
		sharpNote: 'n',
		flatNote: 'n',
		preferSharp: true,
		defaultOctaveFrequency: (WesternAFrequency * 22) / 16
	},
	{ sharpNote: 'o', flatNote: 'o', defaultOctaveFrequency: (WesternAFrequency * 23) / 16 },
	{
		sharpNote: 'p',
		flatNote: 'p',
		preferSharp: false,
		defaultOctaveFrequency: (WesternAFrequency * 24) / 16
	},
	{ sharpNote: 'q', flatNote: 'q', defaultOctaveFrequency: (WesternAFrequency * 25) / 16 },
	{
		sharpNote: 'r',
		flatNote: 'r',
		preferSharp: false,
		defaultOctaveFrequency: (WesternAFrequency * 26) / 16
	},
	{ sharpNote: 's', flatNote: 's', defaultOctaveFrequency: (WesternAFrequency * 27) / 16 },
	{ sharpNote: 't', flatNote: 't', defaultOctaveFrequency: (WesternAFrequency * 28) / 16 },
	{ sharpNote: 'u', flatNote: 'u', defaultOctaveFrequency: (WesternAFrequency * 29) / 16 },
	{ sharpNote: 'v', flatNote: 'v', defaultOctaveFrequency: (WesternAFrequency * 30) / 16 },
	{ sharpNote: 'w', flatNote: 'w', defaultOctaveFrequency: (WesternAFrequency * 31) / 16 }
];

export const diatonicIntervals = [2, 2, 1, 2, 2, 2, 1];
export const pentatonicMajorIntervals = [2, 2, 3, 2, 3];
export const hexatonicMinorBluesIntervals = [3, 2, 1, 1, 3, 2];

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
	diatonic: [0.3, 0.05, 0.15, 0.05, 0.075, 0.05, 0.03],
	hexatonic: [0.3, 0.075, 0.15, 0.075, 0.075, 0.05]
};

export const jamBassProbabilityDistributions = {
	pentatonic: [0.5, 0.05, 0.15, 0.2, 0.05],
	diatonic: [0.5, 0.02, 0.05, 0.1, 0.1, 0.05, 0.02],
	hexatonic: [0.5, 0.02, 0.05, 0.1, 0.1, 0.05]
};

export const MINIMUM_BEAT_DIVISION = 0.25;

export const prioritisedIntervalTypes: IntervalType[] = [
	'perfect',
	'major',
	'minor',
	'augmented',
	'diminished'
];
