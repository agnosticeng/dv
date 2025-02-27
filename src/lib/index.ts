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

export type Point = {
	[key: string]: Value;
};

export type ChartSettingsType = {
	type: 'candle' | 'line' | 'bar';
	x: string;
	y: string[];
	z?: string;
};
