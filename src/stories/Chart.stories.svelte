<script module>
	import Chart from '$lib/Chart/Chart.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Agnostic/Chart/Line',
		component: Chart,
		tags: ['autodocs'],
		args: {
			data: [
				{ id: 1, name: 'Item 1', date: '2023-01-01', value: 100.5 },
				{ id: 2, name: 'Item 2', date: '2023-01-02', value: 200.75 },
				{ id: 3, name: 'Item 3', date: '2023-01-03', value: 150.25 },
				{ id: 4, name: 'Item 4', date: '2023-01-04', value: 300.0 },
				{ id: 5, name: 'Item 5', date: '2023-01-05', value: 250.5 }
			],
			settings: {
				chartType: 'line',
				legends: true,
				xAxis: {
					series: ['date']
				},
				yAxis: {
					series: ['value']
				}
			}
		}
	});
</script>

<Story name="Base" />
