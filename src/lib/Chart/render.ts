import type { Data, ChartSettingsType } from '$lib/index.js';
import { line, candlestick } from './kind/index.js';

export const renderChart = (
	inputDiv: HTMLElement,
	inputData: Data,
	settings: ChartSettingsType
) => {
	inputDiv?.firstChild?.remove();

	if (!settings || settings.xAxis.series.length == 0 || settings.yAxis.series.length == 0) {
		return;
	}

	const xAxisSeries = settings.xAxis.series[0];
	const yAxisSeries = settings.yAxis.series;

	let plot;

	const width = inputDiv.clientWidth;
	const height = inputDiv.clientHeight;

	switch (settings.chartType) {
		case 'line':
			plot = line(inputData, xAxisSeries, yAxisSeries, width, height);
			break;
		case 'candle':
			plot = candlestick(inputData, xAxisSeries, yAxisSeries, width, height);
			break;
	}

	inputDiv?.append(plot);
};
