<script setup lang="ts">
	import type { ModeGroup, ScaleNote } from '../types';
	import { playScaleUpDown, playScalePedal, playScaleDrone, jam } from '../utils/sounds';

	export let rootNoteIndex: number;
	export let bpm: number;
	export let selectedScaleNotes: ScaleNote[];
	export let selectedModesGroup: ModeGroup;
</script>

<div>
	<button
		on:click={() => {
			playScaleUpDown(selectedScaleNotes, rootNoteIndex, (60 * 1000) / bpm);
		}}
	>
		▶ Scale
	</button>
	<button
		on:click={() => {
			playScalePedal(selectedScaleNotes, rootNoteIndex, (60 * 1000) / bpm);
		}}
	>
		▶ Scale + Pedal
	</button>
	<button
		on:click={() => {
			playScaleDrone(selectedScaleNotes, rootNoteIndex, (60 * 1000) / bpm);
		}}
	>
		▶ Scale + Drone
	</button>
	<button
		on:click={() => {
			jam(
				selectedScaleNotes,
				rootNoteIndex,
				selectedModesGroup.probabilityDistributions.melody,
				selectedModesGroup.probabilityDistributions.bass,
				(60 * 1000) / bpm
			);
		}}
	>
		▶ Jam
	</button>
</div>
