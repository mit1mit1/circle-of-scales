export interface Note {
	sharpNote: string;
	flatNote: string;
	preferSharp?: boolean;
}

export interface ScaleNote {
	semitonesFromRoot: number;
	label: string;
};
