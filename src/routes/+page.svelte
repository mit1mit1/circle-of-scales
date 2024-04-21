<script setup lang="ts">
	import { ionianScale, notes } from '../constants/notes';
	import type { Note, ScaleNote } from '../types';
	const circleRadius = 330;
	const circleCentre = {
		x: 400,
		y: 400
	};

	let rootNoteIndex = 0;

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

	const isInIonianScale = (noteIndex: number, rootNoteIndex: number) => {
		let semitonesFromRoot = (noteIndex - rootNoteIndex) % notes.length;
		if (semitonesFromRoot < 0) {
			semitonesFromRoot = semitonesFromRoot + notes.length;
		}
		return ionianScale.some((scaleNote) => scaleNote.semitonesFromRoot === semitonesFromRoot);
	};
</script>

<div class="appContainer" data-sveltekit-preload-data="hover">
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
			<g class="transitionNote">
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={getNotePosition(index).x}
					cy={getNotePosition(index).y}
					r={30}
					stroke="black"
					fill="transparent"
					class={isInIonianScale(index, rootNoteIndex)
						? 'transitionNote visible'
						: 'transitionNote hidden'}
				/>
				<text
					x={getNotePosition(index).x}
					y={getNotePosition(index).y}
					class={`svgNoteName ${
						isInIonianScale(index, rootNoteIndex) ? 'svgSelectedNoteName' : ''
					}`}
					text-anchor="middle"
					dy=".3em">{getNoteString(note)}</text
				>
			</g>
		{/each}
		{#each [...ionianScale] as scaleNote}
			<g class="transitionNote">
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={getScaleNotePosition(scaleNote, 0).x}
					cy={getScaleNotePosition(scaleNote, 0).y}
					r={30}
					transform={`rotate(${(rootNoteIndex * 360) / notes.length} ${circleCentre.x} ${
						circleCentre.y
					})`}
					class="hidden"
					fill="transparent"
				/>
				<text
					x={getScaleNotePosition(scaleNote, 0).x}
					y={getScaleNotePosition(scaleNote, 0).y}
					text-anchor="middle"
					dy=".3em"
					transform={`rotate(${(rootNoteIndex * 360) / notes.length} ${circleCentre.x} ${
						circleCentre.y
					})`}
					class="svgNoteName scaleNote">{scaleNote.label}</text
				>
			</g>
		{/each}
	</svg>

	{getNoteString(notes[rootNoteIndex])}
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
		transition: all 700ms ease-in-out;
	}

	.hidden {
		opacity: 0;
	}

	.transitionNote {
		opacity: 1;
		transition: opacity 0.25s linear;
	}

	.transitionNote.hidden {
		opacity: 0;
	}
</style>
