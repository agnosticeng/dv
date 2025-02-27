import type { TimeIntervalName } from '@observablehq/plot';

export function isConvertibleToDate(input: unknown[]): boolean {
	if (input.length === 0) return false;
	return input.every((d) => !isNaN(new Date(d as string).getTime()));
}

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_MONTH;

export const findBestInterval = (dates: Date[]): TimeIntervalName => {
	const timeDiffs = dates.slice(1).map((date, i) => date.getTime() - dates[i].getTime());
	const minDiff = Math.min(...timeDiffs);

	if (minDiff >= ONE_YEAR) return 'year';
	if (minDiff >= ONE_MONTH) return 'month';
	if (minDiff >= ONE_DAY) return 'day';
	if (minDiff >= ONE_HOUR) return 'hour';
	if (minDiff >= ONE_MINUTE) return 'minute';
	return 'second';
};
