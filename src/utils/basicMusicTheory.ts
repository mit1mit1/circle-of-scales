import type { Note } from '../types';

export const getNoteString = (note: Note) => {
	if (note.preferSharp) {
		return note.sharpNote;
	}
	return note.flatNote;
};
