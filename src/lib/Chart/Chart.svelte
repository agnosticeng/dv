<script lang="ts">
	import type { ChartSettingsType, Data } from '../types.js';
	import { renderChart } from './render.js';

	let {
		data,
		settings
	}: {
		data: Data;
		settings: ChartSettingsType;
	} = $props();

	let div: HTMLElement;
	let resizeObserver: ResizeObserver;

	const render = () => {
		if (
			div?.parentElement &&
			div.parentElement.clientHeight > 0 &&
			div.parentElement.clientWidth > 0
		) {
			div.style.width = `${div.parentElement.clientWidth}px`;
			div.style.height = `${div.parentElement.clientHeight}px`;
		}
		renderChart(div, data, settings);
	};

	$effect(() => {
		render();

		if (div?.parentElement) {
			resizeObserver = new ResizeObserver(() => {
				console.log('resize');
				if (settings) {
					render();
				}
			});
			resizeObserver.observe(div.parentElement);

			return () => {
				resizeObserver.disconnect();
			};
		}
	});
</script>

<div class="chart" bind:this={div} role="img"></div>
