import type { Data, ChartSettingsType } from '$lib/index.js';
import { line, bar, candlestick, hbar, bubble } from './kind/index.js';

export const renderChart = (div: HTMLElement, data: Data, settings: ChartSettingsType) => {
	div?.firstChild?.remove();

	if (!settings || !settings.x || !settings.y.length) {
		return;
	}

	let plot: Node | undefined;

	const size = {
		width: div.clientWidth,
		height: div.clientHeight
	};

	const axis = {
		x: settings.x,
		y: settings.y,
		z: settings.z,
		legend: settings.legend
	};

	switch (settings.type) {
		case 'line':
			plot = line(size, data, axis);
			break;
		case 'bar':
			plot = bar(size, data, axis);
			break;
		case 'candle':
			plot = candlestick(size, data, axis);
			break;
		case 'h-bar':
			plot = hbar(size, data, axis);
			break;
		case 'bubble':
			plot = bubble(size, data, axis);
			break;
	}

	if (plot) {
		div?.append(plot);
	}
};
