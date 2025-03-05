import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import { time } from '../utils/time.js';

import type { Data, Point } from '$lib/index.js';
import colors from '../utils/colors.js';

export default function hbar(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
) {
	return Plot.plot({
		...d,
		color: { legend: !!axis.z },
		marks: axis.y.map((y, i) =>
			Plot.rectX(data, {
				x: y,
				y: time(axis.x),
				fill: axis.z ?? colors[i],
				sort: (d: Point) => d[axis.x],
				tip: true
			})
		),
		width: size.width,
		height: size.height,
		y: { type: 'band', ...d.x }
	});
}
