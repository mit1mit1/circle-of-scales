<script setup lang="ts">
	import { getPositiveModulo } from '../utils/math';
	import { getIntervalLabel } from '../utils/basicMusicTheory';
	import { playTriad, playInterval } from '../utils/sounds';
	import { getNotePosition, getScaleNotePosition } from '../utils/svgLayout';
	import { getTriad, getTriadScaleNotes, getTriadTypeFromSelectedScale } from '../utils/triads';
	import type { Circle, Note, Scale, ScaleNote } from '../types';
	import { lastFocussedItems } from '../store';

	export let selectedScale: Scale;
	export let rootNoteIndex: number;
	export let availableModes: Scale[];
	export let isEquivalentModing: boolean;
	export let notePositionCircle: Circle;
	export let intervalPositionCircle: Circle;
	export let scaleNotePositionCircle: Circle;
	export let bpm: number;
	export let chromaticNotes: Note[];

	const handleSelectInterval = (scaleNote: ScaleNote) => {
		playInterval(scaleNote, rootNoteIndex, chromaticNotes, (60 * 1000) / bpm);
		lastFocussedItems.update((focussedItems) => {
			return {
				interval: scaleNote
			};
		});
	};

	const handleSelectTriad = (scaleNoteIndex: number) => {
		playTriad(
			rootNoteIndex,
			scaleNoteIndex,
			chromaticNotes,
			selectedScale.scale,
			(60 * 1000) / bpm
		);
		lastFocussedItems.update((focussedItems) => {
			const triadScaleNotes = getTriadScaleNotes(
				scaleNoteIndex,
				selectedScale.scale,
				chromaticNotes
			);
			return {
				triad: {
					rootNote:
						chromaticNotes[
							getPositiveModulo(
								rootNoteIndex + selectedScale.scale[scaleNoteIndex].semitonesFromRoot,
								chromaticNotes.length
							)
						],
					firstInterval: {
						semitonesFromRoot:
							triadScaleNotes[1].semitonesFromRoot - triadScaleNotes[0].semitonesFromRoot
					},
					secondInterval: {
						semitonesFromRoot:
							triadScaleNotes[2].semitonesFromRoot - triadScaleNotes[0].semitonesFromRoot
					}
				}
			};
		});
	};
</script>

{#each [...selectedScale.scale] as scaleNote, scaleNoteIndex}
	{@const notePosition = isEquivalentModing
		? getNotePosition(
				selectedScale.scale[
					getPositiveModulo(
						scaleNoteIndex - availableModes.findIndex((scale) => scale === selectedScale),
						selectedScale.scale.length
					)
				].semitonesFromRoot + rootNoteIndex,
				notePositionCircle,
				chromaticNotes.length
		  )
		: getNotePosition(
				scaleNote.semitonesFromRoot + rootNoteIndex,
				notePositionCircle,
				chromaticNotes.length
		  )}
	{@const scaleNotePosition = getScaleNotePosition(
		scaleNote,
		rootNoteIndex,
		scaleNotePositionCircle,
		chromaticNotes.length
	)}
	{@const intervalPosition = getScaleNotePosition(
		scaleNote,
		rootNoteIndex,
		intervalPositionCircle,
		chromaticNotes.length
	)}
	<circle
		style="stroke-width:1.6871;stroke-miterlimit:10;"
		cx={0}
		cy={0}
		r={30}
		transform={`translate(${notePosition.x} ${notePosition.y})`}
		stroke="black"
		fill="transparent"
		class="transitionAll"
	/>
	<g class="transitionNote">
		<g
			class="clickable"
			on:click={() => handleSelectTriad(scaleNoteIndex)}
			on:keydown={(e) => e.key === 'Enter' && handleSelectTriad(scaleNoteIndex)}
			tabindex="0"
			aria-label={`Play ${
				chromaticNotes[
					getPositiveModulo(rootNoteIndex + scaleNote.semitonesFromRoot, chromaticNotes.length)
				]
			} ${getTriadTypeFromSelectedScale(scaleNoteIndex, selectedScale.scale)} triad`}
			role="button"
		>
			<circle
				style="stroke-width:1.6871;stroke-miterlimit:10;"
				cx={0}
				cy={0}
				r={30}
				transform={`translate(${scaleNotePosition.x} ${scaleNotePosition.y})`}
				stroke="transparent"
				fill={'transparent'}
			/>
			<text
				x={0}
				y={0}
				text-anchor="middle"
				dy=".3em"
				transform={`translate(${scaleNotePosition.x} ${scaleNotePosition.y})`}
				class="svgNoteName scaleNote transitionAll"
			>
				{scaleNote.label}
			</text>
		</g>
		<g
			class="clickable"
			on:click={() => handleSelectInterval(scaleNote)}
			on:keydown={(e) => e.key === 'Enter' && handleSelectInterval(scaleNote)}
			tabindex="0"
			aria-label={`Play ${getIntervalLabel(scaleNote, scaleNoteIndex)} interval`}
			role="button"
		>
			<circle
				style="stroke-width:1.6871;stroke-miterlimit:10;"
				cx={0}
				cy={0}
				r={30}
				transform={`translate(${intervalPosition.x} ${intervalPosition.y})`}
				stroke="transparent"
				fill={'transparent'}
			/>
			<text
				x={0}
				y={0}
				text-anchor="middle"
				dy=".3em"
				transform={`translate(${intervalPosition.x} ${intervalPosition.y})`}
				class="svgNoteName scaleNote transitionAll"
			>
				{getIntervalLabel(scaleNote, scaleNoteIndex)}
			</text>
		</g>
	</g>
{/each}
