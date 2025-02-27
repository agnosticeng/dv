import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import { findBestInterval, isConvertibleToDate } from '../utils.js';

export default function bar(
	input: Data,
	xSerie: string,
	ySeries: string[],
	width: number,
	height: number,
	legend = false
) {
	const isTimeSerie = isConvertibleToDate(input.map((d) => d[xSerie]));

	const data = ySeries
		.map((y) =>
			input.map((d) => ({
				[xSerie]: isTimeSerie ? new Date(d[xSerie] as string) : d[xSerie],
				value: Number(d[y]),
				label: y
			}))
		)
		.flat();

	const interval = isTimeSerie
		? findBestInterval(input.map((d) => new Date(d[xSerie] as string)))
		: undefined;

	return Plot.plot({
		marks: [Plot.barY(data, { x: xSerie, y: 'value', fill: 'label' })],
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
