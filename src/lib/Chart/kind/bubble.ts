import type { Data } from '$lib/index.js';
import * as Plot from '@observablehq/plot';
import d from '../utils/conf.js';
import * as d3 from 'd3';

export default function bubble(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string; legend?: 'x' | 'y' | 'z' }
): Node | undefined {
	const pack = d3.pack<Data[number]>().size([size.width, size.height]).padding(5);

	const root = pack(
		d3
			.hierarchy<
				Data[number]
			>({ children: data.filter((d) => +d[axis.y[0]]!) } as unknown as Data[number])
			.sum((d) => +d[axis.y[0]]!)
	);

	const circles = root.leaves().map((d) => ({ ...d.data, ...d }));
	const R = circles.map((c) => c.r);
	const F = circles.map((c) => c.data[axis.x] as string);

	const rIdentity = getIdentityScaleOptions([Math.min(...R), Math.max(...R)]);
	const sizeIdentity = getIdentityScaleOptions([0, size.width]);

	return Plot.plot({
		...d,
		grid: false,
		axis: false,
		x: { ...d.x, ...sizeIdentity },
		y: sizeIdentity,
		r: rIdentity,
		color: { legend: axis.legend === 'x', domain: F },
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

function getIdentityScaleOptions(range: Plot.ScaleOptions['range']): Plot.ScaleOptions {
	return { type: 'linear', domain: range, range: range };
}
