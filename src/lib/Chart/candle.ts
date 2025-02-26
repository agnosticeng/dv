import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { ChartConfig } from './render.js';

export function candle(input: Data, xSerie: string, { height, width }: ChartConfig) {
	const ySeries = ['low', 'high', 'open', 'close'];
	const data = input.map((d) => ({
		[xSerie]: new Date(d[xSerie] as string),
		...Object.fromEntries(ySeries.map((y) => [y, Number(d[y])]))
	}));

	return Plot.plot({
		marks: [
			Plot.ruleX(data, { x: xSerie, y1: 'low', y2: 'high' }),
			Plot.ruleX(data, {
				x: xSerie,
				y1: 'open',
				y2: 'close',
				stroke: (d) => (d['close'] > d['open'] ? '#4daf4a' : '#e41a1c'),
				strokeWidth: 4,
				strokeLinecap: 'round'
			})
		],
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
