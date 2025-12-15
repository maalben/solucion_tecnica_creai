export function normalize(text: string) {
	return text.replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

export function arraysHaveSameElements(arr1: string[], arr2: string[]) {
	const set1 = new Set(arr1.map(normalize));
	const set2 = new Set(arr2.map(normalize));
	if (set1.size !== set2.size) return false;
	for (const item of set1) {
		if (!set2.has(item)) return false;
	}
	return true;
}

