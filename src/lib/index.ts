export { default as Table } from './Table.svelte';
export { default as Chart } from './Chart/Chart.svelte';

export type Column = {
	name: string;
	type: string;
};

export type Value = string | number | boolean | null | Array<string | number | boolean | null>;

export type Data = Array<{
	[key: string]: Value;
}>;

export type ChartSettingsType = {
	chartType: 'candle' | 'line';
	xAxis: {
		series: string[];
	};
	yAxis: {
		series: string[];
	};
};
