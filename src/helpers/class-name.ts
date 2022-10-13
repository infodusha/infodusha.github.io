export function cn(...classNames: Array<string | Record<string, boolean>>): string {
	return classNames.map(item => {
		if (typeof item === 'string') {
			return item;
		}

		return Object.entries(item).filter(([_, value]) => value).map(([key]) => key).join(' ');
	}).join(' ');
}
