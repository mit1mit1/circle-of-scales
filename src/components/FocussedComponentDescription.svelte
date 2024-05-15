<script setup lang="ts">
	import { lastFocussedItems } from '../store';
	import type { LastFocussedItems } from '../types';
	import {
		getAllPossibleIntervalLabels,
		getIntervalName,
		getNoteString
	} from '../utils/basicMusicTheory';
	import { getTriadTypeFromTriad } from '../utils/triads';
	let currentFocussedItem: LastFocussedItems = {};

	lastFocussedItems.subscribe((newFocussedItems) => {
		currentFocussedItem = { ...newFocussedItems };
	});
</script>

<div class="focussedItemDetails">
	{#if currentFocussedItem.interval}
		<h3>Equivalent intervals:</h3>
		{@const allPossibleIntervals = getAllPossibleIntervalLabels(
			currentFocussedItem.interval.semitonesFromRoot
		)}
		<div>
			{#each allPossibleIntervals as possibleInterval}
				<span>{getIntervalName(possibleInterval.intervalType, possibleInterval.intervalN)}; </span>
			{/each}
		</div>
	{/if}
	{#if currentFocussedItem.triad}
		<h3>Triad:</h3>
		<div>
			{getNoteString(currentFocussedItem.triad.rootNote)}
			{getTriadTypeFromTriad(currentFocussedItem.triad)}
		</div>
	{/if}
</div>

<style>
	.focussedItemDetails {
		min-width: 500px;
		margin-bottom: 20px;
	}
</style>
