export interface Note {
	sharpNote: string;
	flatNote: string;
	preferSharp?: boolean;
}

export interface ScaleNote {
	semitonesFromRoot: number;
	label: string;
};

export type ChordType = 'major' | 'minor' | 'diminished' | 'bizarre';
