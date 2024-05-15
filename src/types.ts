export interface Note {
	sharpNote: string;
	flatNote: string;
	preferSharp?: boolean;
	defaultOctaveFrequency: number;
}

export interface Interval {
	semitonesFromRoot: number;
}

export interface ScaleNote {
	semitonesFromRoot: number;
	label: string;
}

export interface Triad {
	firstInterval: Interval,
	secondInterval: Interval,
}

export type TriadType = 'major' | 'minor' | 'diminished' | 'bizarre';

export type Circle = {
	xCentre: number;
	yCentre: number;
	radius: number;
};

export type SynthType = Exclude<OscillatorType, 'custom'>;

export type InstrumentSettings = {
	attackTime: number;
	decayTime: number;
	maxSustainTime?: number;
	sustainGainRatio: number;
	releaseTime: number;
	maxGain: number;
	oscillatorType: SynthType;
};
