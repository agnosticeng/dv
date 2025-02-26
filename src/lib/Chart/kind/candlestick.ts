import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import { time } from '../time.js';
import type { Data } from '$lib/index.js';

export default function candlestick(
	inputData: Data,
	xAxisSeries: string,
	yAxisSeries: string[],
	width: number,
	height: number
): Node {
	const marks: Plot.Markish[] = [];

	const timeData = time(inputData, xAxisSeries, yAxisSeries);

	marks.push(
		Plot.ruleX(timeData, {
			x: xAxisSeries,
			y1: 'low',
			y2: 'high'
		}),
		Plot.ruleX(timeData, {
			x: xAxisSeries,
			y1: 'open',
			y2: 'close',
			stroke: (d: { [key: string]: string }) => (d['close'] > d['open'] ? '#4daf4a' : '#e41a1c'),
			strokeWidth: 4,
			strokeLinecap: 'round'
		})
	);

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
