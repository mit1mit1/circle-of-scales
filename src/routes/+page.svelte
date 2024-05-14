<script setup lang="ts">
	import { modeGroups, getIntervalLabel } from '../utils/modes';
	import type { Circle, Note, ScaleNote } from '../types';
	import { getPositiveModulo } from '../utils/math';
	import {
		jamBassProbabilityDistributions,
		jamMelodyProbabilityDistributions,
		westernChromaticScale
	} from '../utils/constants';
	import { playScaleUpDown, playScalePedal, playScaleDrone, jam } from '../utils/sounds';
	import { currentlyPlayingRelativeToRoot } from '../store';

	const visibleCircle: Circle = {
		xCentre: 400,
		yCentre: 400,
		radius: 300
	};

	let highlightedRelativeToRoot: Record<string, number> = {};

	currentlyPlayingRelativeToRoot.subscribe((newPlayingNotes) => {
		console.log('newPlayingNotes are', newPlayingNotes);
		highlightedRelativeToRoot = newPlayingNotes;
	});

	let isEquivalentModing = true;

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

	let bpm = 90;
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
				<circle
					style="stroke-width:1.6871;stroke-miterlimit:10;"
					cx={0}
					cy={0}
					r={30}
					transform={`translate(${notePosition.x} ${notePosition.y})`}
					stroke="transparent"
					fill={highlightedRelativeToRoot[
						`${getPositiveModulo(index - rootNoteIndex, westernChromaticScale.length)}`
					] > 0
						? 'green'
						: 'var(--base-background-color)'}
					opacity={highlightedRelativeToRoot[
						`${getPositiveModulo(index - rootNoteIndex, westernChromaticScale.length)}`
					] > 0
						? '0.5'
						: '0'}
					class="transitionAllQuick"
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
			{@const notePosition = isEquivalentModing
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
	<div class="boxOfButtons">
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
								isEquivalentModing = true;
							}}
							class={scale === selectedScale && isEquivalentModing ? 'selectedTab' : ''}
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
								isEquivalentModing = false;
							}}
							class={scale === selectedScale && !isEquivalentModing ? 'selectedTab' : ''}
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
		<div class="musicControls">
			<div>
				<button
					on:click={() => {
						playScaleUpDown(selectedScale.scale, rootNoteIndex, (60 * 1000) / bpm);
					}}
				>
					▶ Scale
				</button>
				<button
					on:click={() => {
						playScalePedal(selectedScale.scale, rootNoteIndex, (60 * 1000) / bpm);
					}}
				>
					▶ Scale + Pedal
				</button>
				<button
					on:click={() => {
						playScaleDrone(selectedScale.scale, rootNoteIndex, (60 * 1000) / bpm);
					}}
				>
					▶ Scale + Drone
				</button>
				<button
					on:click={() => {
						jam(
							selectedScale.scale,
							rootNoteIndex,
							jamMelodyProbabilityDistributions[
								selectedModesGroup === modeGroups[1] ? 'pentatonic' : 'diatonic'
							],
							jamBassProbabilityDistributions[
								selectedModesGroup === modeGroups[1] ? 'pentatonic' : 'diatonic'
							],
							(60 * 1000) / bpm
						);
					}}
				>
					▶ Jam
				</button>
			</div>
		</div>
		<div class="musicControls">
			<div>
				<div>
					<button
						on:click={() => {
							if (bpm > 10) {
								bpm = bpm - 20;
							}
						}}
					>
						-
					</button>
					<span class="noteLabel">
						{bpm} bpm
					</span>
					<button
						on:click={() => {
							bpm = bpm + 20;
						}}
					>
						+
					</button>
				</div>
			</div>
		</div>
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

	.boxOfButtons {
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

	.musicControls {
		margin-top: 20px;
	}

	.musicControls > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
</style>
