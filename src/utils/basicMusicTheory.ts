import type { Note, ScaleNote } from '../types';
import { westernChromaticScale } from './constants';
import { getPositiveModulo } from './math';

export const getNoteString = (note: Note) => {
	if (note.preferSharp) {
		return note.sharpNote;
	}
	return note.flatNote;
};

export const isInScale = (noteIndex: number, rootNoteIndex: number, scale: ScaleNote[]) => {
	let semitonesFromRoot = getPositiveModulo(
		noteIndex - rootNoteIndex,
		westernChromaticScale.length
	);
	if (semitonesFromRoot < 0) {
		semitonesFromRoot = semitonesFromRoot + westernChromaticScale.length;
	}
	return scale.some((scaleNote) => scaleNote.semitonesFromRoot === semitonesFromRoot);
};
