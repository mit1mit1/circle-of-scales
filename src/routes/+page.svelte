<script setup lang="ts">
	import { modeGroups } from '../utils/modes';
	import type { Circle } from '../types';
	import { getPositiveModulo } from '../utils/math';
	import { westernChromaticScale } from '../utils/constants';
	import ScaleHeading from '../components/ScaleHeading.svelte';
	import { getNoteString } from '../utils/basicMusicTheory';
	import MusicPlayers from '../components/MusicPlayers.svelte';
	import WesternChromaticCircle from '../components/WesternChromaticCircle.svelte';
	import SelectedScaleCircle from '../components/SelectedScaleCircle.svelte';
	import FocussedComponentDescription from '../components/FocussedComponentDescription.svelte';

	const visibleCircle: Circle = {
		xCentre: 400,
		yCentre: 400,
		radius: 300
	};

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

	let bpm = 70;
</script>

<ScaleHeading {rootNoteIndex} selectedScaleName={selectedScale.name} />
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
		<SelectedScaleCircle
			{selectedScale}
			{bpm}
			{rootNoteIndex}
			{intervalPositionCircle}
			{scaleNotePositionCircle}
			availableModes={selectedModesGroup.modes}
			{isEquivalentModing}
			{notePositionCircle}
		/>
		<WesternChromaticCircle
			{notePositionCircle}
			{rootNoteIndex}
			selectedScaleNotes={selectedScale.scale}
		/>
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
			<MusicPlayers
				{bpm}
				{rootNoteIndex}
				{selectedModesGroup}
				selectedScaleNotes={selectedScale.scale}
			/>
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
	
	<FocussedComponentDescription />
</div>

<style>
	@import '../themes/light.css';
	@import '../themes/global.css';

	.background {
		z-index: -2;
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

	:global(button) {
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

	:global(button):hover:not(.selectedTab) {
		background-color: var(--button-hover-background-color);
	}

	:global(button).selectedTab {
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

	:global(.svgNoteName) {
		font: 30px sans-serif;
	}

	:global(.scaleNote) {
		font-weight: bold;
	}

	:global(.hidden) {
		opacity: 0;
	}

	:global(.transitionAll) {
		-webkit-transition: all 500ms ease;
		-moz-transition: all 500ms ease;
		-ms-transition: all 500ms ease;
		-o-transition: all 500ms ease;
		transition: all 500ms ease-in-out;
	}

	.musicControls {
		margin-top: 20px;
	}

	.musicControls > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	:global(.clickable) {
		cursor: pointer;
	}
</style>
