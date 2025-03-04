import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import { time } from '../utils/time.js';

import type { Data, Point } from '$lib/index.js';
import colors from '../utils/colors.js';

export default function line(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node {
	return Plot.plot({
		...d,
		color: { legend: !!axis.z },
		marks: axis.y.map((y, i) =>
			Plot.rectY(data, {
				x: time(axis.x),
				y,
				fill: axis.z ?? colors[i],
				sort: (d: Point) => d[axis.x]
			})
		),
		width: size.width,
		height: size.height,
		x: { type: 'band', ...d.x }
	});
}
