<script setup lang="ts">
	import type { ModeGroup, Note, ScaleNote } from '../types';
	import { playScaleUpDown, playScalePedal, playScaleDrone, jam } from '../utils/sounds';

	export let rootNoteIndex: number;
	export let bpm: number;
	export let selectedScaleNotes: ScaleNote[];
	export let selectedModesGroup: ModeGroup;
	export let chromaticNotes: Note[];
</script>

<div>
	<button
		on:click={() => {
			playScaleUpDown(selectedScaleNotes, rootNoteIndex, chromaticNotes, (60 * 1000) / bpm);
		}}
	>
		▶ Scale
	</button>
	<button
		on:click={() => {
			playScalePedal(selectedScaleNotes, rootNoteIndex, chromaticNotes, (60 * 1000) / bpm);
		}}
	>
		▶ Scale + Pedal
	</button>
	<button
		on:click={() => {
			playScaleDrone(selectedScaleNotes, rootNoteIndex, chromaticNotes, (60 * 1000) / bpm);
		}}
	>
		▶ Scale + Drone
	</button>
	<button
		on:click={() => {
			jam(
				selectedScaleNotes,
				rootNoteIndex,
				chromaticNotes,
				selectedModesGroup.probabilityDistributions.melody,
				selectedModesGroup.probabilityDistributions.bass,
				(60 * 1000) / bpm
			);
		}}
	>
		▶ Jam
	</button>
</div>
