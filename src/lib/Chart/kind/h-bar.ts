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
	return Plot.plot({
		...d,
		color: { legend: !!axis.z },
		marks: [
			...d.marks,
			...axis.y.map((y, i) =>
				Plot.rectX(data, {
					x: y,
					y: time(axis.x),
					fill: axis.z ?? colors[i],
					tip: true,
					sort: { y: null }
				})
			)
		],
		width: size.width,
		height: size.height,
		marginLeft: axis.z ? 5 : 40,
		y: { type: 'band', ...d.x, axis: axis.z ? null : undefined }
	});
}
