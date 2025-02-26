import type { ChartSettingsType, Data } from '$lib/index.js';
import { bar } from './bar.js';
import { candle } from './candle.js';
import { line } from './line.js';

export interface ChartConfig {
	height: number;
	width: number;
	legend?: boolean;
}

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

	const config: ChartConfig = {
		height: inputDiv.clientHeight,
		width: inputDiv.clientWidth,
		legend: settings.legends
	};

	switch (settings.chartType) {
		case 'line':
			return inputDiv.append(line(inputData, xAxisSeries, yAxisSeries, config));
		case 'candle':
			return inputDiv.append(candle(inputData, xAxisSeries, config));
		case 'bar':
			return inputDiv.append(bar(inputData, xAxisSeries, yAxisSeries, config));
	}
};
