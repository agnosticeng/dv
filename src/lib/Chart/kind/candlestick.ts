import * as Plot from '@observablehq/plot';
import type { Data } from '$lib/index.js';
import { time } from '../utils/time.js';
import d from '../utils/conf.js';

export default function candlestick(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node {
	return Plot.plot({
		...d,
		marks: [
			Plot.ruleX(data, {
				x: time(axis.x),
				y1: 'low',
				y2: 'high',
				tip: {
					format: {
						x: true,
						y1: false,
						y2: false,
						open: true,
						close: true,
						high: true,
						low: true
					}
				},
				channels: { open: 'open', close: 'close', high: 'high', low: 'low' }
			}),
			Plot.ruleX(data, {
				x: time(axis.x),
				y1: 'open',
				y2: 'close',
				stroke: (d: { [key: string]: string }) => (d['close'] > d['open'] ? '#4daf4a' : '#e41a1c'),
				strokeWidth: 4,
				strokeLinecap: 'round'
			})
		],
		width: size.width,
		height: size.height
	});
}
