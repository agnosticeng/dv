import * as Plot from '@observablehq/plot';

import d from '../utils/conf.js';
import { time } from '../utils/time.js';

import type { Data } from '$lib/index.js';
import colors from '../utils/colors.js';

export default function bar(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string; legend?: 'x' | 'y' | 'z' }
): Node {
	return Plot.plot({
		...d,
		color: { legend: axis.legend === 'z' },
		x: { type: 'band', legend: axis.legend === 'x', ...d.x },
		y: { legend: axis.legend === 'y' },
		marks: [
			...d.marks,
			...axis.y.map((y, i) =>
				Plot.rectY(data, {
					x: time(axis.x),
					y,
					fill: axis.z ?? colors[i],
					tip: true
				})
			)
		],
		width: size.width,
		height: size.height
	});
}
