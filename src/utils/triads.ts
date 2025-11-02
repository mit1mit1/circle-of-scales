import type { Note, RelativeTriad, ScaleNote, TriadType } from '../types';
import { getPositiveModulo, sumIntervals } from './math';

export const getTriadTypeFromSemitoneGaps = (
	semitonesFromRootToSecondNote: number,
	semitonesFromRootToThirdNote: number
) => {
	if (semitonesFromRootToSecondNote === 4 && semitonesFromRootToThirdNote === 7) {
		return 'major';
	}
	if (semitonesFromRootToSecondNote === 3 && semitonesFromRootToThirdNote === 7) {
		return 'minor';
	}
	if (semitonesFromRootToSecondNote === 3 && semitonesFromRootToThirdNote === 6) {
		return 'diminished';
	}
	return 'bizarre';
};

export const getTriadTypeFromSelectedScale = (
	scaleNoteIndex: number,
	selectedScale: ScaleNote[]
) => {
	const scaleNotes = [
		{ ...selectedScale[scaleNoteIndex] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 2, selectedScale.length)] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 4, selectedScale.length)] }
	];
	return getTriadTypeFromSemitoneGaps(
		scaleNotes[1].semitonesFromRoot,
		scaleNotes[1].semitonesFromRoot + scaleNotes[2].semitonesFromRoot
	);
};

export const getTriadTypeFromTriad = (triad: RelativeTriad): TriadType => {
	return getTriadTypeFromSemitoneGaps(
		triad.firstInterval.semitonesFromRoot,
		triad.secondInterval.semitonesFromRoot
	);
};

export const getTriad = (indexRelativeToIonian: number, intervals: number[]): RelativeTriad => {
	return {
		firstInterval: {
			semitonesFromRoot: sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 2, intervals)
		},
		secondInterval: {
			semitonesFromRoot: sumIntervals(indexRelativeToIonian, indexRelativeToIonian + 4, intervals)
		}
	};
};

export const getTriadScaleNotes = (
	scaleNoteIndex: number,
	selectedScale: ScaleNote[],
	chromaticNotes: Note[]
) => {
	const scaleNotes = [
		{ ...selectedScale[scaleNoteIndex] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 2, selectedScale.length)] },
		{ ...selectedScale[getPositiveModulo(scaleNoteIndex + 4, selectedScale.length)] }
	];

	scaleNotes.forEach((scaleNote, index) => {
		if (index <= 0) {
			return;
		}
		if (scaleNote.semitonesFromRoot < scaleNotes[index - 1].semitonesFromRoot) {
			scaleNote.semitonesFromRoot += chromaticNotes.length;
		}
		return;
	});

	return scaleNotes;
};
