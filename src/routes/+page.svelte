<script setup lang="ts">
	import { diatonicScales, notes } from '../constants/notes';
	import type { Note, ScaleNote } from '../types';
	import { getPositiveModulo } from '../utils';
	const circleRadius = 330;
	const circleCentre = {
		x: 400,
		y: 400
	};

	let rootNoteIndex = 0;

	let selectedScale = diatonicScales[0];

	const getNoteString = (note: Note) => {
		if (note.preferSharp) {
			return note.sharpNote;
		}
		return note.flatNote;
	};

	const getNotePosition = (noteIndex: number) => {
		return {
			x:
				circleCentre.x +
				(circleRadius - 10) * Math.cos((noteIndex * 2 * Math.PI) / notes.length - 0.5 * Math.PI),
			y:
				circleCentre.y +
				(circleRadius - 10) * Math.sin((noteIndex * 2 * Math.PI) / notes.length - 0.5 * Math.PI)
		};
	};

	const getScaleNotePosition = (scaleNote: ScaleNote, rootIndex: number) => {
		return {
			x:
				circleCentre.x +
				(circleRadius - 80) *
					Math.cos(
						((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) / notes.length - 0.5 * Math.PI
					),
			y:
				circleCentre.y +
				(circleRadius - 80) *
					Math.sin(
						((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) / notes.length - 0.5 * Math.PI
					)
		};
	};

	const isInScale = (noteIndex: number, rootNoteIndex: number, scale: ScaleNote[]) => {
		let semitonesFromRoot = getPositiveModulo(noteIndex - rootNoteIndex, notes.length);
		if (semitonesFromRoot < 0) {
			semitonesFromRoot = semitonesFromRoot + notes.length;
		}
		return scale.some((scaleNote) => scaleNote.semitonesFromRoot === semitonesFromRoot);
	};
</script>

<div class="appContainer" data-sveltekit-preload-data="hover">
	<h1>
		{getNoteString(notes[getPositiveModulo(rootNoteIndex, notes.length)])}
		{selectedScale.name}
	</h1>
	<svg id="boxOfNotes" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx={circleCentre.x}
			cy={circleCentre.y}
			r={circleRadius + 30}
			stroke="grey"
			stroke-width={1}
			fill="transparent"
		/>
		{#each [...notes] as note, index}
			<g class="transitionAll">
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={getNotePosition(index).x}
					cy={getNotePosition(index).y}
					r={30}
					stroke="black"
					fill="transparent"
					class="hidden transitionAll"
				/>
				<text
					x={getNotePosition(index).x}
					y={getNotePosition(index).y}
					class={`svgNoteName transitionAll ${
						isInScale(index, rootNoteIndex, selectedScale.scale) ? 'svgSelectedNoteName' : ''
					}`}
					text-anchor="middle"
					dy=".3em">{getNoteString(note)}</text
				>
			</g>
		{/each}
		{#each [...selectedScale.scale] as scaleNote}
			<g class="transitionNote">
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={0}
					cy={0}
					r={30}
					transform={`translate(${getNotePosition(scaleNote.semitonesFromRoot + rootNoteIndex).x} ${
						getNotePosition(scaleNote.semitonesFromRoot + rootNoteIndex).y
					})`}
					stroke="black"
					fill="transparent"
					class="transitionAll"
				/>
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={0}
					cy={0}
					r={30}
					transform={`translate(${getScaleNotePosition(scaleNote, rootNoteIndex).x} ${
						getScaleNotePosition(scaleNote, rootNoteIndex).y
					})`}
					class="hidden"
					fill="transparent"
				/>
				<text
					x={0}
					y={0}
					text-anchor="middle"
					dy=".3em"
					transform={`translate(${getScaleNotePosition(scaleNote, rootNoteIndex).x} ${
						getScaleNotePosition(scaleNote, rootNoteIndex).y
					})`}
					class="svgNoteName scaleNote transitionAll">{scaleNote.label}</text
				>
			</g>
		{/each}
	</svg>

	<div>
		{getNoteString(notes[getPositiveModulo(rootNoteIndex, notes.length)])}
		<button
			on:click={() => {
				rootNoteIndex = rootNoteIndex - 1;
				if (rootNoteIndex < 0) {
					rootNoteIndex = rootNoteIndex + 12;
				}
			}}
		>
			-
		</button>
		<button
			on:click={() => {
				rootNoteIndex = rootNoteIndex + 1;
				if (rootNoteIndex >= 12) {
					rootNoteIndex = rootNoteIndex - 12;
				}
			}}
		>
			+
		</button>
	</div>
	<div>
		{#each diatonicScales as diatonicScale}
			{@const relativeIndex =
				rootNoteIndex + diatonicScale.rootIntervalToIonian - selectedScale.rootIntervalToIonian}
			<button
				on:click={() => {
					selectedScale = diatonicScale;
					rootNoteIndex = getPositiveModulo(relativeIndex, notes.length);
				}}
			>
				{getNoteString(notes[getPositiveModulo(relativeIndex, notes.length)])}
				{diatonicScale.name}
			</button>
		{/each}
	</div>
</div>

<style>
	.appContainer {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 400px;
		height: 400px;
	}

	#boxOfNotes {
		width: 100%;
	}

	.svgNoteName {
		font: 30px sans-serif;
	}

	.svgSelectedNoteName {
		font-weight: bold;

		-moz-border-radius: 30px; /* or 50% */
		border-radius: 30px; /* or 50% */

		background-color: black;
		color: white;
		text-align: center;
		font-size: 2em;
	}

	.scaleNote {
		font-weight: bold;
	}

	.hidden {
		opacity: 0;
	}

	.transitionAll {
		transition: all 500ms ease-in-out;
	}

	.transitionAll.hidden {
		opacity: 0;
	}
</style>
