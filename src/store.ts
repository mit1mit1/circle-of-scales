import { writable } from 'svelte/store';

export const currentlyPlayingRelativeToRoot = writable({} as Record<string, number>);
