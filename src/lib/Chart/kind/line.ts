import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import colors from '../utils/colors.js';

import type { Data, Point } from '$lib/index.js';

export default function line(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node {
	return Plot.plot({
		marks: axis.y.map((y, i) =>
			Plot.line(data, {
				x: (d: Point) => {
					const val = d[axis.x];
					const date = new Date(val as string | number);
					return isNaN(date.getTime()) ? val : date;
				},
				y,
				stroke: axis.z ?? colors[i],
				sort: (d: Point) => d[axis.x],
				tip: true
			})
		),
		width: size.width,
		height: size.height,
		...d
	});
}
