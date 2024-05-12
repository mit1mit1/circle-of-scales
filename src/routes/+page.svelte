<script setup lang="ts">
	import { modeGroups, getIntervalLabel } from '../utils/modes';
	import type { Circle, Note, ScaleNote } from '../types';
	import { getPositiveModulo } from '../utils/math';
	import { westernChromaticScale } from '../utils/constants';
	import { makeNote } from '../utils/sounds';
	const noteDuration = 250;
	const noteGap = 50;
	const noteLength = noteDuration + noteGap;
	const visibleCircle: Circle = {
		xCentre: 400,
		yCentre: 400,
		radius: 300
	};

	let isEquivilantModing = true;

	const notePositionCircle: Circle = {
		...visibleCircle,
		radius: visibleCircle.radius
	};

	const scaleNotePositionCircle: Circle = {
		...visibleCircle,
		radius: visibleCircle.radius - 70
	};

	const intervalPositionCircle: Circle = {
		...visibleCircle,
		radius: visibleCircle.radius + 70
	};

	let rootNoteIndex = 0;

	let selectedModesGroup = modeGroups[0];
	let selectedScale = selectedModesGroup.modes[0];

	const getNoteString = (note: Note) => {
		if (note.preferSharp) {
			return note.sharpNote;
		}
		return note.flatNote;
	};

	const getNotePosition = (noteIndex: number, circle: Circle) => {
		return {
			x:
				circle.xCentre +
				circle.radius *
					Math.cos((noteIndex * 2 * Math.PI) / westernChromaticScale.length - 0.5 * Math.PI),
			y:
				circle.yCentre +
				circle.radius *
					Math.sin((noteIndex * 2 * Math.PI) / westernChromaticScale.length - 0.5 * Math.PI)
		};
	};

	const getScaleNotePosition = (scaleNote: ScaleNote, rootIndex: number, circle: Circle) => {
		return {
			x:
				circle.xCentre +
				circle.radius *
					Math.cos(
						((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) /
							westernChromaticScale.length -
							0.5 * Math.PI
					),
			y:
				circle.yCentre +
				circle.radius *
					Math.sin(
						((scaleNote.semitonesFromRoot + rootIndex) * 2 * Math.PI) /
							westernChromaticScale.length -
							0.5 * Math.PI
					)
		};
	};

	const isInScale = (noteIndex: number, rootNoteIndex: number, scale: ScaleNote[]) => {
		let semitonesFromRoot = getPositiveModulo(
			noteIndex - rootNoteIndex,
			westernChromaticScale.length
		);
		if (semitonesFromRoot < 0) {
			semitonesFromRoot = semitonesFromRoot + westernChromaticScale.length;
		}
		return scale.some((scaleNote) => scaleNote.semitonesFromRoot === semitonesFromRoot);
	};
</script>

<h1>
	{getNoteString(
		westernChromaticScale[getPositiveModulo(rootNoteIndex, westernChromaticScale.length)]
	)}
	{selectedScale.name}
</h1>
<div class="appContainer" data-sveltekit-preload-data="hover">
	<svg id="boxOfNotes" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx={visibleCircle.xCentre}
			cy={visibleCircle.yCentre}
			r={visibleCircle.radius}
			stroke="grey"
			stroke-width={1}
			fill="var(--base-background-color)"
			class="background"
		/>
		{#each [...westernChromaticScale] as note, index}
			{@const notePosition = getNotePosition(index, notePositionCircle)}
			<g>
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={0}
					cy={0}
					r={30}
					transform={`translate(${notePosition.x} ${notePosition.y})`}
					stroke="transparent"
					fill={index === rootNoteIndex ? 'yellow' : 'var(--base-background-color)'}
				/>
				<text
					x={notePosition.x}
					y={notePosition.y}
					class={`svgNoteName ${
						isInScale(index, rootNoteIndex, selectedScale.scale) ? 'svgSelectedNoteName' : ''
					}`}
					text-anchor="middle"
					dy=".3em">{getNoteString(note)}</text
				>
			</g>
		{/each}
		{#each [...selectedScale.scale] as scaleNote, index}
			{@const notePosition = isEquivilantModing
				? getNotePosition(
						selectedScale.scale[
							getPositiveModulo(
								index - selectedModesGroup.modes.findIndex((scale) => scale === selectedScale),
								selectedScale.scale.length
							)
						].semitonesFromRoot + rootNoteIndex,
						notePositionCircle
				  )
				: getNotePosition(scaleNote.semitonesFromRoot + rootNoteIndex, notePositionCircle)}
			{@const scaleNotePosition = getScaleNotePosition(
				scaleNote,
				rootNoteIndex,
				scaleNotePositionCircle
			)}
			{@const intervalPosition = getScaleNotePosition(
				scaleNote,
				rootNoteIndex,
				intervalPositionCircle
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
				<text
					x={0}
					y={0}
					text-anchor="middle"
					dy=".3em"
					transform={`translate(${scaleNotePosition.x} ${scaleNotePosition.y})`}
					class="svgNoteName scaleNote transitionAll">{scaleNote.label}</text
				>
				<text
					x={0}
					y={0}
					text-anchor="middle"
					dy=".3em"
					transform={`translate(${intervalPosition.x} ${intervalPosition.y})`}
					class="svgNoteName scaleNote transitionAll">{getIntervalLabel(scaleNote, index)}</text
				>
			</g>
		{/each}
	</svg>
	<div id="boxOfButtons">
		<div>
			Root note
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
			<span class="noteLabel">
				{getNoteString(
					westernChromaticScale[getPositiveModulo(rootNoteIndex, westernChromaticScale.length)]
				)}
			</span>
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
			Mode type
			{#each modeGroups as modeGroup}
				<button
					on:click={() => {
						if (selectedModesGroup !== modeGroup) {
							selectedModesGroup = modeGroup;
							selectedScale = modeGroup.modes[0];
						}
					}}
					class={selectedModesGroup === modeGroup ? 'selectedTab' : ''}
				>
					{modeGroup.label}
				</button>
			{/each}
		</div>
		<div>
			<div>
				<div>
					<h2>Equivalent {selectedModesGroup.label} modes</h2>
					{#each selectedModesGroup.modes as scale}
						{@const relativeIndex =
							rootNoteIndex + scale.rootIntervalToIonian - selectedScale.rootIntervalToIonian}
						<button
							on:click={() => {
								selectedScale = scale;
								rootNoteIndex = getPositiveModulo(relativeIndex, westernChromaticScale.length);
								isEquivilantModing = true;
							}}
							class={scale === selectedScale && isEquivilantModing ? 'selectedTab' : ''}
						>
							<span class="noteLabel"
								>{getNoteString(
									westernChromaticScale[
										getPositiveModulo(relativeIndex, westernChromaticScale.length)
									]
								)}</span
							>
							{scale.name}
						</button>
					{/each}
				</div>
			</div>
			<div>
				<div>
					<h2>Modes by modification</h2>
					{#each selectedModesGroup.modes as scale}
						{@const relativeIndex = rootNoteIndex}
						<button
							on:click={() => {
								selectedScale = scale;
								rootNoteIndex = getPositiveModulo(relativeIndex, westernChromaticScale.length);
								isEquivilantModing = false;
							}}
							class={scale === selectedScale && !isEquivilantModing ? 'selectedTab' : ''}
						>
							<span class="noteLabel"
								>{getNoteString(
									westernChromaticScale[
										getPositiveModulo(relativeIndex, westernChromaticScale.length)
									]
								)}</span
							>
							{scale.name}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div>
		<button
			on:click={() => {
				[...selectedScale.scale].forEach((scaleNote, index) => {
					// Root note
					makeNote(
						westernChromaticScale[rootNoteIndex],
						0,
						index * 2 * noteLength + noteGap,
						index * 2 * noteLength + noteGap + noteDuration
					);
					// Note
					makeNote(
						westernChromaticScale[rootNoteIndex],
						scaleNote.semitonesFromRoot,
						(index * 2 + 1) * noteLength + noteGap,
						(index * 2 + 1) * noteLength + noteGap + noteDuration
					);
				});
				// Root note
				makeNote(
					westernChromaticScale[rootNoteIndex],
					0,
					selectedScale.scale.length * 2 * noteLength + noteGap,
					selectedScale.scale.length * 2 * noteLength + noteGap + noteDuration
				);
				// Octave up note
				makeNote(
					westernChromaticScale[rootNoteIndex],
					westernChromaticScale.length,
					(selectedScale.scale.length * 2 + 1) * noteLength + noteGap,
					(selectedScale.scale.length * 2 + 1) * noteLength + noteGap + noteDuration
				);
			}}>Play</button
		>
	</div>
</div>

<style>
	@import '../themes/light.css';
	@import '../themes/global.css';

	.background {
		z-index: -2;
	}

	.midground {
		z-index: -1;
	}

	h1 {
		font-family: var(--font-family-standard);
		text-align: center;
		line-height: 2em;
	}

	h2 {
		font-family: var(--font-family-standard);
		font-size: medium;
	}

	.noteLabel {
		min-width: 22px;
		display: inline-block;
		text-align: center;
	}

	button {
		margin-bottom: 5px;
		margin-right: 5px;
		transition-duration: 0.4s;
		border: none;
		padding: 8px 8px;
		font-size: 1.15em;
		font-family: var(--font-family-standard);
		font-weight: 300;
		cursor: pointer;
		color: var(--button-color);
		min-height: 30px;
		overflow: hidden;
		transition: max-height 0.5s ease-out;
		display: inline-block;
		transition: background-color 0.5s;
		border-radius: 3px;
		background-color: var(--button-background-color);
	}

	button:hover:not(.selectedTab) {
		background-color: var(--button-hover-background-color);
	}

	button.selectedTab {
		background-color: var(--button-selected-background-color);
	}

	.appContainer {
		display: flex;
		margin-left: auto;
		margin-right: auto;
		max-width: 1000px;
		flex-wrap: wrap;
		padding-inline: 20px;
		justify-content: space-evenly;
	}

	.appContainer svg {
		width: 400px;
		height: 400px;
	}

	#boxOfButtons {
		max-width: 500px;
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
		-webkit-transition: all 500ms ease;
		-moz-transition: all 500ms ease;
		-ms-transition: all 500ms ease;
		-o-transition: all 500ms ease;
		transition: all 500ms ease-in-out;
	}

	.transitionAll.hidden {
		opacity: 0;
	}
</style>
