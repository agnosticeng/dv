import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import d from '../utils/conf.js';
import * as d3 from 'd3';

export default function bubble(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node | undefined {
	const pack = d3.pack<Data[number]>().size([size.width, size.height]).padding(5);

	const root = pack(
		d3
			.hierarchy<Data[number]>({ children: data } as unknown as Data[number])
			.sum((d) => +d[axis.y[0]]!)
	);

	const circles = root.leaves().map((d) => ({ ...d.data, ...d }));
	const min = Math.min(...circles.map((c) => c.r));
	const max = Math.max(...circles.map((c) => c.r));

	const identity = {
		type: 'linear',
		domain: [min, max],
		range: [min, max]
	} satisfies Plot.ScaleOptions;

	return Plot.plot({
		...d,
		grid: false,
		axis: false,
		x: { ...d.x, ...identity },
		y: identity,
		r: identity,
		marks: [
			Plot.dot(circles, {
				r: (d) => d.r,
				x: (d) => d.x,
				y: (d) => d.y,
				fill: axis.x,
				channels: { [axis.x]: (d) => d[axis.x], [axis.y[0]]: (d) => d[axis.y[0]] },
				tip: { format: { x: false, y: false, r: false } }
			})
		],
		width: size.width,
		height: size.height
	});
}
