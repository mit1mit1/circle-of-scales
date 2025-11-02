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

const temperedScaleLength = 96;

const getTemperedScale = (notesPerOctave: number) => {
	const temperedScale = [];
	let noteName = 'α';
	for (let i = 0; i < notesPerOctave; i++) {
		temperedScale.push({
			sharpNote: noteName,
			flatNote: noteName,
			defaultOctaveFrequency: WesternAFrequency * 2 ** (i / notesPerOctave)
		});
		noteName = String.fromCharCode(noteName.charCodeAt(0) + 1);
	}
	return temperedScale;
};

export const mitchsTemperedScale: Note[] = getTemperedScale(temperedScaleLength);
// [
// 	{ sharpNote: 'h', flatNote: 'h', defaultOctaveFrequency: WesternAFrequency },
// 	{
// 		sharpNote: 'i',
// 		flatNote: 'i',
// 		preferSharp: true,
// 		defaultOctaveFrequency: (WesternAFrequency * 17) / 16
// 	},
// 	{ sharpNote: 'j', flatNote: 'j', defaultOctaveFrequency: (WesternAFrequency * 18) / 16 },
// 	{
// 		sharpNote: 'k',
// 		flatNote: 'k',
// 		preferSharp: false,
// 		defaultOctaveFrequency: (WesternAFrequency * 19) / 16
// 	},
// 	{ sharpNote: 'l', flatNote: 'l', defaultOctaveFrequency: (WesternAFrequency * 20) / 16 },
// 	{ sharpNote: 'm', flatNote: 'm', defaultOctaveFrequency: (WesternAFrequency * 21) / 16 },
// 	{
// 		sharpNote: 'n',
// 		flatNote: 'n',
// 		preferSharp: true,
// 		defaultOctaveFrequency: (WesternAFrequency * 22) / 16
// 	},
// 	{ sharpNote: 'o', flatNote: 'o', defaultOctaveFrequency: (WesternAFrequency * 23) / 16 },
// 	{
// 		sharpNote: 'p',
// 		flatNote: 'p',
// 		preferSharp: false,
// 		defaultOctaveFrequency: (WesternAFrequency * 24) / 16
// 	},
// 	{ sharpNote: 'q', flatNote: 'q', defaultOctaveFrequency: (WesternAFrequency * 25) / 16 },
// 	{
// 		sharpNote: 'r',
// 		flatNote: 'r',
// 		preferSharp: false,
// 		defaultOctaveFrequency: (WesternAFrequency * 26) / 16
// 	},
// 	{ sharpNote: 's', flatNote: 's', defaultOctaveFrequency: (WesternAFrequency * 27) / 16 },
// 	{ sharpNote: 't', flatNote: 't', defaultOctaveFrequency: (WesternAFrequency * 28) / 16 },
// 	{ sharpNote: 'u', flatNote: 'u', defaultOctaveFrequency: (WesternAFrequency * 29) / 16 },
// 	{ sharpNote: 'v', flatNote: 'v', defaultOctaveFrequency: (WesternAFrequency * 30) / 16 },
// 	{ sharpNote: 'w', flatNote: 'w', defaultOctaveFrequency: (WesternAFrequency * 31) / 16 }
// ];

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

// export const linearRatios = [
// 	1,
// 	17 / 16,
// 	18 / 16,
// 	19 / 16,
// 	20 / 16,
// 	21 / 16,
// 	22 / 16,
// 	23 / 16,
// 	24 / 16,
// 	25 / 16,
// 	26 / 16,
// 	27 / 16,
// 	28 / 16,
// 	29 / 16,
// 	30 / 16,
// 	31 / 16
// ];

export const mitchsHarmonicScaleSemitoneRatios = [
	1,
	// 1 + 1 / 8,
	// 1 + 1 / 7,
	// 1 + 1 / 6,
	1 + 1 / 5,
	1 + 1 / 4,
	1 + 1 / 3,
	1 + 1 / 2
];

// export const equalTempermentRatios = [
// 	1,
// 	2 ** (1 / 8),
// 	2 ** (1 / 4),
// 	2 ** (3 / 8),
// 	2 ** (1 / 2),
// 	2 ** (5 / 8),
// 	2 ** (3 / 4),
// 	2 ** (7 / 8)
// 	//2 ** 1,
// ];

const getEqualTempermentRatios = (notesPerOctave: number) => {
	const equalTempermentRatios = [];
	for (let i = 0; i < notesPerOctave; i++) {
		equalTempermentRatios.push(2 ** (i / notesPerOctave));
	}
	return equalTempermentRatios;
};

export const equalTempermentRatios = getEqualTempermentRatios(mitchsTemperedScale.length);
// Standard western case
// [
// 	(1,
// 	2 ** (1 / 12),
// 	2 ** (2 / 12),
// 	2 ** (3 / 12),
// 	2 ** (4 / 12),
// 	2 ** (5 / 12),
// 	2 ** (6 / 12),
// 	2 ** (7 / 12),
// 	2 ** (8 / 12),
// 	2 ** (9 / 12),
// 	2 ** (10 / 12),
// 	2 ** (11 / 12))
// 	//2 ** 1,
// ];

export const getJamDistribution = (notesPerOctave: number) => {
	const distribution = [];
	for (let i = 0; i < notesPerOctave; i++) {
		distribution.push(0.9 / notesPerOctave);
	}
	distribution[0] += 0.1;
	return distribution;
};

export const jamMelodyProbabilityDistributions = {
	pentatonic: [0.3, 0.05, 0.05, 0.2, 0.1],
	diatonic: [0.3, 0.05, 0.15, 0.05, 0.075, 0.05, 0.03],
	hexatonic: [0.3, 0.075, 0.15, 0.075, 0.075, 0.05],
	// mitchChromatic: [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
	mitchChromatic: getJamDistribution(mitchsTemperedScale.length)
};

export const jamBassProbabilityDistributions = {
	pentatonic: [0.5, 0.05, 0.15, 0.2, 0.05],
	diatonic: [0.5, 0.02, 0.05, 0.1, 0.1, 0.05, 0.02],
	hexatonic: [0.5, 0.02, 0.05, 0.1, 0.1, 0.05],
	// mitchChromatic: [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
	mitchChromatic: getJamDistribution(mitchsTemperedScale.length)
};

export const MINIMUM_BEAT_DIVISION = 0.25;

export const prioritisedIntervalTypes: IntervalType[] = [
	'perfect',
	'major',
	'minor',
	'augmented',
	'diminished'
];
