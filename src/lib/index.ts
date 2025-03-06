export { default as Table } from './Table.svelte';
export { default as Chart } from './Chart/Chart.svelte';

export type Column = {
	name: string;
	type: string;
};

type LiteralValue = string | number | boolean | null;
export type Value = LiteralValue | Array<LiteralValue> | Record<string, LiteralValue>;

export type Data = Array<{
	[key: string]: Value;
}>;

export type Point = {
	[key: string]: Value;
};

export type ChartSettingsType = {
	type: 'candle' | 'line' | 'bar' | 'h-bar';
	x: string;
	y: string[];
	z?: string;
};
