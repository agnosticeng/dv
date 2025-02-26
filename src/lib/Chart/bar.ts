import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { ChartConfig } from './render.js';

export function bar(
	input: Data,
	xSerie: string,
	ySeries: string[],
	{ height, width, legend }: ChartConfig
) {
	const isTimeSerie = isConvertibleToDate(input.map((d) => d[xSerie]));

	const data = input.map((d) => ({
		[xSerie]: isTimeSerie ? new Date(d[xSerie] as string) : (d[xSerie] as string),
		...Object.fromEntries(ySeries.map((y) => [y, Number(d[y])]))
	}));

	const interval = isTimeSerie ? findBestInterval(data.map((d) => d[xSerie] as Date)) : undefined;
	const colors = d3.schemeCategory10;

	return Plot.plot({
		marks: ySeries.map((y, i) =>
			Plot.barY(data, { x: xSerie, y, interval, sort: 'x', fill: colors[i % colors.length] })
		),
		marginTop: 15,
		marginRight: 15,
		marginBottom: 30,
		marginLeft: 40,
		grid: true,
		width,
		height,
		color: { legend },
		y: {
			label: null,
			labelArrow: false,
			tickFormat: d3.format('.2s')
		},
		x: {
			label: null,
			labelArrow: false,
			interval
		}
	});
}

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_MONTH;

const findBestInterval = (dates: Date[]): Plot.TimeIntervalName => {
	const timeDiffs = dates.slice(1).map((date, i) => date.getTime() - dates[i].getTime());
	const minDiff = Math.min(...timeDiffs);

	if (minDiff >= ONE_YEAR) return 'year';
	if (minDiff >= ONE_MONTH) return 'month';
	if (minDiff >= ONE_DAY) return 'day';
	if (minDiff >= ONE_HOUR) return 'hour';
	if (minDiff >= ONE_MINUTE) return 'minute';
	return 'second';
};

function isConvertibleToDate(input: unknown[]): boolean {
	if (input.length === 0) return false;
	return input.every((d) => !isNaN(new Date(d as string).getTime()));
}
