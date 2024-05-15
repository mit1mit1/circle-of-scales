import type { Circle, ScaleNote } from '../types';
import { westernChromaticScale } from './constants';

export const getScaleNotePosition = (scaleNote: ScaleNote, rootIndex: number, circle: Circle) => {
	return {
		x:
			circle.xCentre +
			circle.radius *
				Math.cos(
					((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) / westernChromaticScale.length -
						0.5 * Math.PI
				),
		y:
			circle.yCentre +
			circle.radius *
				Math.sin(
					((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) / westernChromaticScale.length -
						0.5 * Math.PI
				)
	};
};

export const getNotePosition = (noteIndex: number, circle: Circle) => {
	return {
		x:
			circle.xCentre +
			circle.radius *
				Math.cos((noteIndex * 2 * Math.PI) / westernChromaticScale.length - 0.5 * Math.PI),
		y:
			circle.yCentre +
			circle.radius *
				Math.sin((noteIndex * 2 * Math.PI) / westernChromaticScale.length - 0.5 * Math.PI)
	};
};
