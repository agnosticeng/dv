import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

import colors from '../colors.js';
import { time } from '../time.js';
import type { Data } from '$lib/index.js';

export default function line(
	inputData: Data,
	xAxisSeries: string,
	yAxisSeries: string[],
	width: number,
	height: number
): Node {
	const marks: Plot.Markish[] = [];

	const timeData = time(inputData, xAxisSeries, yAxisSeries);

	yAxisSeries.forEach((ySeries, index) => {
		marks.push(
			Plot.line(timeData, {
				x: xAxisSeries ?? '',
				y: ySeries ?? '',
				stroke: colors[index % colors.length]
			})
		);
	});

	return Plot.plot({
		marks,
		marginTop: 15,
		marginRight: 15,
		marginBottom: 30,
		marginLeft: 40,
		grid: true,
		width,
		height,
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
