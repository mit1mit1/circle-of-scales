import * as Tone from 'tone';

console.log(Tone);
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease('C4', '8n');
let allowAudio = false;

export const instrumentVolume = -24;
export const instrument = new Tone.Synth().toDestination();
instrument.volume.value = instrumentVolume;

export const turnOnAudio = () => {
	if (allowAudio) {
		Tone.start();
		Tone.Transport.start();
	} else {
		allowAudio = true;
	}
};
