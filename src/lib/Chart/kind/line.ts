import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import colors from '../utils/colors.js';

import type { Data, Point, Value } from '$lib/index.js';

export default function line(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node {
	return Plot.plot({
		marks: [
			...axis.y.map((y, i) =>
				Plot.line(data, {
					x: (d: Point) => {
						const val = d[axis.x];
						const date = new Date(val as string | number);
						return isNaN(date.getTime()) ? val : date;
					},
					y,
					stroke: axis.z ?? colors[i],
					tip: axis.y.length === 1
				})
			),
			...tip(data, axis)
		],
		width: size.width,
		height: size.height,
		...d
	});
}

function tip(data: Data, axis: { x: string; y: string[]; z?: string }) {
	if (axis.y.length <= 1) return [];

	const tipsData = data.map((d) => ({
		...d,
		_y: avg(...axis.y.map((y) => d[y]))
	}));

	function x(d: Point) {
		const val = d[axis.x];
		const date = new Date(val as string | number);
		return isNaN(date.getTime()) ? val : date;
	}

	return [
		Plot.ruleX(data, Plot.pointerX({ x, stroke: 'currentColor' })),
		...axis.y.map((y, i) => Plot.dot(data, Plot.pointerX({ x, y, stroke: axis.z ?? colors[i] }))),
		Plot.tip(
			tipsData,
			Plot.pointerX({ x, y: '_y', channels: channels(axis.y), format: { y: false } })
		)
	];
}

function avg(...args: Value[]) {
	return args.reduce<number>((acc, k) => acc + Number(k), 0) / args.length;
}

function channels(y: string[]) {
	return y.reduce<Record<string, string>>((acc, k) => ({ ...acc, [k]: k }), {});
}
