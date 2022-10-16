type Item = undefined | string | Record<string, boolean>;

export function cn(...classNames: Item[]): string {
	return classNames
		.filter((item): item is Exclude<Item, undefined> => Boolean(item))
		.map(item => {
			if (typeof item === 'string') {
				return item;
			}

			return Object.entries(item).filter(([_, value]) => value).map(([key]) => key).join(' ');
		})
		.join(' ');
}
