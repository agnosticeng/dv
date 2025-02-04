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
