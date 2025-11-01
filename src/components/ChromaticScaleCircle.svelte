<script setup lang="ts">
	import type { Circle, Note, ScaleNote } from '../types';
	import { getNoteString, isInScale } from '../utils/basicMusicTheory';

	import { getPositiveModulo } from '../utils/math';
	import { playNote } from '../utils/sounds';
	import { getNotePosition } from '../utils/svgLayout';
	import { currentlyPlayingRelativeToRoot } from '../store';

	export let notePositionCircle: Circle;
	export let rootNoteIndex: number;
	export let selectedScaleNotes: ScaleNote[];
	export let chromaticNotes: Note[];

	let highlightedRelativeToRoot: Record<string, number> = {};

	currentlyPlayingRelativeToRoot.subscribe((newPlayingNotes) => {
		highlightedRelativeToRoot = newPlayingNotes;
	});
</script>

{#each [...chromaticNotes] as note, index}
	{@const notePosition = getNotePosition(index, notePositionCircle)}
	<g
		class="clickable"
		on:click={() =>
			playNote(
				chromaticNotes[rootNoteIndex],
				getPositiveModulo(index - rootNoteIndex, chromaticNotes.length),
				0,
				500
			)}
		on:keydown={(e) =>
			e.key === 'Enter' &&
			playNote(
				chromaticNotes[rootNoteIndex],
				getPositiveModulo(index - rootNoteIndex, chromaticNotes.length),
				0,
				500
			)}
		tabindex="0"
		aria-label={`Play ${getNoteString(note)}`}
		role="button"
	>
		<circle
			style="stroke-width:1.6871;stroke-miterlimit:10;"
			cx={0}
			cy={0}
			r={30}
			transform={`translate(${notePosition.x} ${notePosition.y})`}
			stroke="transparent"
			fill={index === rootNoteIndex ? 'yellow' : 'var(--base-background-color)'}
		/>
		<circle
			style="stroke-width:1.6871;stroke-miterlimit:10;"
			cx={0}
			cy={0}
			r={30}
			transform={`translate(${notePosition.x} ${notePosition.y})`}
			stroke="transparent"
			fill={highlightedRelativeToRoot[
				`${getPositiveModulo(index - rootNoteIndex, chromaticNotes.length)}`
			] > 0
				? 'blue'
				: 'var(--base-background-color)'}
			opacity={(highlightedRelativeToRoot[
				`${getPositiveModulo(index - rootNoteIndex, chromaticNotes.length)}`
			] ?? 0) / 3}
			class="transitionAllQuick"
		/>
		<text
			x={notePosition.x}
			y={notePosition.y}
			class={`svgNoteName ${
				isInScale(index, rootNoteIndex, selectedScaleNotes) ? 'svgSelectedNoteName' : ''
			}`}
			text-anchor="middle"
			dy=".3em"
		>
			{getNoteString(note)}
		</text>
	</g>
{/each}

<style>
	.svgSelectedNoteName {
		font-weight: bold;

		-moz-border-radius: 30px; /* or 50% */
		border-radius: 30px; /* or 50% */

		background-color: black;
		color: white;
		text-align: center;
		font-size: 2em;
	}

	.transitionAllQuick {
		-webkit-transition: all 60ms ease-out;
		-moz-transition: all 60ms ease-out;
		-ms-transition: all 60ms ease-out;
		-o-transition: all 60ms ease-out;
		transition: all 60ms ease-out;
	}

	.transitionAll.hidden {
		opacity: 0;
	}
</style>
