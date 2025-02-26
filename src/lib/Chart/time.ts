import type { Data } from '$lib/index.js';

export function time(inputData: Data, xAxisSeries: string, yAxisSeries: string[]) {
	return inputData
		.map((d) => ({
			...d,
			[xAxisSeries]: new Date(d[xAxisSeries] as string),
			...Object.fromEntries(yAxisSeries.map((s) => [s, Number(d[s])]))
		}))
		.sort((a, b) => {
			const aDate = a[xAxisSeries] as Date;
			const bDate = b[xAxisSeries] as Date;
			return aDate.getTime() - bDate.getTime();
		});
}
