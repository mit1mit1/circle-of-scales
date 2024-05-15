<script setup lang="ts">
	import { getNoteString } from '../utils/basicMusicTheory';
	import { westernChromaticScale } from '../utils/constants';
	import { getPositiveModulo } from '../utils/math';

	export let rootNoteIndex: number;
	export let selectedScaleName: string;
</script>

<h1>
	{getNoteString(
		westernChromaticScale[getPositiveModulo(rootNoteIndex, westernChromaticScale.length)]
	)}
	{selectedScaleName}
</h1>

<style>
	h1 {
		font-family: var(--font-family-standard);
		text-align: center;
		line-height: 2em;
		margin-top: 0.33em;
		margin-bottom: 0.33em;
	}
</style>
