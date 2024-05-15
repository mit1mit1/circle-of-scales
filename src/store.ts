import { writable } from 'svelte/store';
import type { LastFocussedItems } from './types';

export const currentlyPlayingRelativeToRoot = writable({} as Record<string, number>);
export const lastFocussedItems = writable({} as LastFocussedItems);
