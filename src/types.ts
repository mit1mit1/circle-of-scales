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

export interface RelativeTriad {
	firstInterval: Interval;
	secondInterval: Interval;
}

export type Triad = RelativeTriad & {
	rootNote: Note;
};

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

export type Scale = {
	name: string;
	scale: ScaleNote[];
	rootIntervalToIonian: number;
};

export type ModeGroup = {
	label: string;
	modes: Scale[];
	probabilityDistributions: {
		bass: number[];
		melody: number[];
	};
};

export type LastFocussedItems = {
	scale?: Scale;
	note?: Note;
	triad?: Triad;
	interval?: Interval;
};

export type IntervalType = 'augmented' | 'perfect' | 'diminished' | 'major' | 'minor';
