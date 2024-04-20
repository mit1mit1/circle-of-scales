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
			<g>
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={getNotePosition(index).x}
					cy={getNotePosition(index).y}
					r={30}
					stroke="black"
					fill="transparent"
					class={isInIonianScale(index, rootNoteIndex) ? 'visible' : 'hidden'}
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
			<g>
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={getScaleNotePosition(scaleNote, rootNoteIndex).x}
					cy={getScaleNotePosition(scaleNote, rootNoteIndex).y}
					r={30}
					class="hidden"
					fill="transparent"
				/>
				<text
					x={getScaleNotePosition(scaleNote, rootNoteIndex).x}
					y={getScaleNotePosition(scaleNote, rootNoteIndex).y}
					text-anchor="middle"
					dy=".3em"
					class="svgNoteName scaleNote">{scaleNote.label}</text
				>
			</g>
		{/each}
	</svg>

	<input type="number" bind:value={rootNoteIndex} />
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
		fill: transparent;
		stroke: transparent;
	}
</style>
