<script setup lang="ts">
	import { lastFocussedItems } from '../store';
	import type { LastFocussedItems } from '../types';
	import { getAllPossibleIntervalLabels, getIntervalLabelString, getIntervalName } from '../utils/basicMusicTheory';
	let currentFocussedItem: LastFocussedItems = {};

	lastFocussedItems.subscribe((newFocussedItems) => {
		console.log('new focussed items woo');
		currentFocussedItem = { ...newFocussedItems };
	});
</script>

<div>
	{#if currentFocussedItem.interval}
		Equivalent intervals:
		{@const allPossibleIntervals = getAllPossibleIntervalLabels(
			currentFocussedItem.interval.semitonesFromRoot
		)}
		{#each allPossibleIntervals as possibleInterval}
			<div>{getIntervalName(possibleInterval.intervalType, possibleInterval.intervalN)}</div>
		{/each}
	{/if}
</div>
