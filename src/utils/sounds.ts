import { semitoneRatios } from './constants';
import type { Note } from '../types';

export const makeNote = (
	rootNote: Note,
	semitonesFromRoot: number,
	startTime: number,
	endTime: number
) => {
	let frequencyMultiplier = 1;
	while (semitonesFromRoot < 0) {
		semitonesFromRoot = semitonesFromRoot + semitoneRatios.length;
		frequencyMultiplier = frequencyMultiplier * 0.5;
	}
	while (semitonesFromRoot >= semitoneRatios.length) {
		semitonesFromRoot = semitonesFromRoot - semitoneRatios.length;
		frequencyMultiplier = frequencyMultiplier * 2;
	}
	frequencyMultiplier = frequencyMultiplier * semitoneRatios[semitonesFromRoot];
	const context = new AudioContext();
	const oscillator = context.createOscillator();
	const volume = context.createGain();
	const compressor = context.createDynamicsCompressor();

	volume.gain.value = 0.001;
	oscillator.type = 'sine';
	oscillator.frequency.value = rootNote.defaultOctaveFrequency * frequencyMultiplier;
	oscillator.connect(volume).connect(compressor).connect(context.destination);

	setTimeout(function () {
		volume.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.005);
		volume.gain.exponentialRampToValueAtTime(
			0.00001,
			context.currentTime + (endTime - startTime) / 1000 + 1
		);
		oscillator.start();
	}, startTime);
	setTimeout(function () {
		oscillator.stop();
		context.close();
	}, endTime + 2000);
};
