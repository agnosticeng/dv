import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import { time } from '../utils/time.js';

import type { Data } from '$lib/index.js';
import colors from '../utils/colors.js';

export default function hbar(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
) {
	const __data = data.map((d, i) => ({ ...d, __index: i }));

	return Plot.plot({
		...d,
		color: { legend: !!axis.z },
		marks: axis.y.map((y, i) =>
			Plot.rectX(__data, {
				x: y,
				y: time(axis.x),
				fill: axis.z ?? colors[i],
				tip: true,
				// @ts-expect-error mistyping from plot
				sort: { y: { x: '__index' } }
			})
		),
		width: size.width,
		height: size.height,
		y: { type: 'band', ...d.x }
	});
}
