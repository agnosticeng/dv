<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Chart from '$lib/Chart/Chart.svelte';
	import stocks from './stock-sample.js';
	import browsers from './browser-sample.js';

	const { Story } = defineMeta({
		title: 'Agnostic/Chart',
		component: Chart,
		tags: ['autodocs']
	});
</script>

<Story
	name="Line"
	args={{
		data: stocks,
		settings: { type: 'line', x: 'date', y: ['low', 'high'] }
	}}
/>

<Story
	name="Candlestick"
	args={{
		data: stocks,
		settings: { type: 'candle', x: 'date', y: ['low', 'high', 'open', 'close'] }
	}}
/>

<Story
	name="Bar"
	args={{
		data: browsers,
		settings: { type: 'bar', x: 'Date', y: ['Version'], z: 'Browser' }
	}}
/>
