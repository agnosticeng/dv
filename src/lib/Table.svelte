<script lang="ts">
	type Column = {
		name: string;
		type: string;
	};

	type Value = string | number | boolean | null | Array<string | number | boolean | null>;

	type Data = Array<{
		[key: string]: Value;
	}>;

	interface Props {
		data: Data;
		columns: Column[];
		theme?: 'light' | 'dark';
	}

	let { data, columns, theme = 'dark' }: Props = $props();

	let table: HTMLElement;

	function formatValue(value: Value) {
		if (value === null) return 'NULL';
		if (value === undefined) return 'UNDEFINED';
		if (Array.isArray(value)) return JSON.stringify(value);
		return value;
	}

	let sortedBy = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let isResizing = $state<string | null>(null);
	let startX = $state<number>(0);
	let columnSizes = $state<Record<string, number>>({});

	$effect(() => {
		columnSizes = columns.reduce((acc, col) => ({ ...acc, [col.name]: 200 }), {});
	});

	const sortedRows = $derived(
		data.toSorted((a, b) => {
			if (!sortedBy) return 0;

			let aVal: Value = a[sortedBy];
			let bVal: Value = b[sortedBy];

			const columnType = columns.find((col) => col.name === sortedBy)?.type;
			const isDateType = columnType?.toLowerCase().includes('date');
			const isNumberType =
				columnType?.toLowerCase().includes('int') || columnType?.toLowerCase().includes('float');

			if (isNumberType) {
				aVal = Number(aVal);
				bVal = Number(bVal);
			}

			if (aVal === null || bVal === null) return 0;

			if (sortDirection === 'asc') {
				return isDateType ? (aVal < bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
			} else {
				return isDateType ? (aVal > bVal ? 1 : -1) : aVal > bVal ? 1 : -1;
			}
		})
	);

	function handleSort(columnName: string) {
		if (isResizing) {
			return;
		}

		if (sortedBy === columnName) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortedBy = columnName;
			sortDirection = 'asc';
		}
	}

	function startResize(e: MouseEvent, columnName: string) {
		table.style.webkitUserSelect = 'none';
		isResizing = columnName;
		startX = e.pageX;
		window.addEventListener('mousemove', handleResize);
		window.addEventListener('mouseup', stopResize);
	}

	function handleResize(e: MouseEvent) {
		if (!isResizing) return;
		const delta = e.pageX - startX;
		startX = e.pageX;
		columnSizes[isResizing] = Math.max(200, columnSizes[isResizing] + delta);
	}

	function stopResize() {
		isResizing = null;
		window.removeEventListener('mousemove', handleResize);
		window.removeEventListener('mouseup', stopResize);
		table.style.webkitUserSelect = '';
	}
</script>

<table class={theme} bind:this={table}>
	<thead>
		<tr>
			{#each columns as { name, type }}
				<th onmouseup={() => handleSort(name)} style="width: {columnSizes[name] || 200}px">
					<div class="th-content">
						<span>{name} <i>({type.replace(/Nullable\((.*)\)/, '$1')})</i></span>
						{#if sortedBy === name}
							<span class="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>
						{/if}
					</div>
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<div
						class="resize-handle"
						role="separator"
						data-column={name}
						onmousedown={(e) => startResize(e, name)}
					></div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each sortedRows as row, i}
			<tr class={i % 2 === 0 ? 'even' : 'odd'}>
				{#each columns as { name, type }}
					{@const value = row[name]}
					{@const isNumberType =
						type.toLowerCase().includes('int') || type.toLowerCase().includes('float')}
					{@const isDateType = type.toLowerCase().includes('date')}
					<td class:text-right={isNumberType || isDateType}>
						<div class="td-content">
							{formatValue(value)}
						</div>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	td,
	th {
		padding: 0 10px;
		height: 26px;
		text-align: left;
		font-family: monospace;
		cursor: default;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		width: max-content;
		min-width: 200px;
	}

	.text-right {
		text-align: right;
	}

	.th-content,
	.td-content {
		overflow: hidden;
		white-space: nowrap;
		position: relative;
	}

	:global(.dark) .th-content,
	:global(.dark) .td-content {
		color: hsl(0deg 0% 80%);
	}

	:global(.light) .th-content,
	:global(.light) .td-content {
		color: hsl(0deg 0% 20%);
	}

	.sort-arrow {
		position: absolute;
		right: 0;
	}

	:global(.dark) td:not(:first-child),
	:global(.dark) th:not(:first-child) {
		border-left: 1px solid hsl(0deg 0% 12%);
	}

	:global(.light) td:not(:first-child),
	:global(.light) th:not(:first-child) {
		border-left: 1px solid hsl(0deg 0% 88%);
	}

	i {
		font-size: 10px;
		font-style: normal;
	}

	:global(.dark) i {
		color: hsl(0deg 0% 60%);
	}

	:global(.light) i {
		color: hsl(0deg 0% 40%);
	}

	th {
		text-align: center;
		position: sticky;
		top: 0;
		z-index: 1;
		font-weight: 400;
		cursor: pointer;
		user-select: none;
	}

	:global(.dark) th {
		background-color: hsl(0deg 0% 5%);
		border-bottom: 1px solid hsl(0deg 0% 12%);
	}

	:global(.light) th {
		background-color: hsl(0deg 0% 95%);
		border-bottom: 1px solid hsl(0deg 0% 88%);
	}

	.resize-handle {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		cursor: col-resize;
		background-color: transparent;
	}

	:global(.dark) .resize-handle:hover {
		background-color: hsl(0deg 0% 30%);
	}

	:global(.light) .resize-handle:hover {
		background-color: hsl(0deg 0% 70%);
	}

	table {
		width: min-content;
		border-collapse: separate;
		border-spacing: 0;
		table-layout: fixed;
		font-size: 11px;
	}

	:global(.dark) tr:hover td {
		background-color: hsl(0deg 0% 10%);
	}

	:global(.light) tr:hover td {
		background-color: hsl(0deg 0% 90%);
	}

	:global(.dark) .odd td {
		background-color: hsl(0deg 0% 7%);
	}

	:global(.dark) .even td {
		background-color: hsl(0deg 0% 4%);
	}

	:global(.light) .odd td {
		background-color: hsl(0deg 0% 93%);
	}

	:global(.light) .even td {
		background-color: hsl(0deg 0% 96%);
	}
</style>
