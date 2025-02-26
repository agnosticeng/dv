import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { ChartConfig } from './render.js';

export function line(
	input: Data,
	xSerie: string,
	ySeries: string[],
	{ height, width, legend }: ChartConfig
) {
	const colors = d3.schemeCategory10;

	const data = input.map((d) => ({
		[xSerie]: new Date(d[xSerie] as string),
		...Object.fromEntries(ySeries.map((y) => [y, Number(d[y])]))
	}));

	return Plot.plot({
		marks: ySeries.map((y, i) =>
			Plot.line(data, { x: xSerie, y, stroke: colors[i % colors.length], sort: 'x' })
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
			labelArrow: false
		}
	});
}
