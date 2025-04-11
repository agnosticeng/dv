<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Table from '$lib/Table.svelte';

	const { Story } = defineMeta({
		title: 'Agnostic/Table',
		component: Table,
		tags: ['autodocs'],
		argTypes: {
			theme: {
				control: 'select',
				options: ['light', 'dark'],
				description: 'Theme for the table'
			}
		},
		args: {
			theme: 'light',
			columns: [
				{ name: 'id', type: 'Int32' },
				{ name: 'name', type: 'String' },
				{ name: 'date', type: 'DateTime' },
				{ name: 'value', type: 'Float64' },
				{ name: 'link', type: 'String' }
			],
			data: [
				{ id: 1, name: 'Item 1', date: '2023-01-01', value: 100.5, link: 'https://agx.app' },
				{ id: 2, name: 'Item 2', date: '2023-01-02', value: 200.75, link: 'https://dgn.space' },
				{ id: 3, name: 'Item 3', date: '2023-01-03', value: 150.25, link: 'https://agnostic.dev' },
				{
					id: 4,
					name: 'Item 4',
					date: '2023-01-04',
					value: 300.0,
					link: 'https://ethereum.org/en/'
				},
				{ id: 5, name: 'Item 5', date: '2023-01-05', value: 250.5, link: 'https://bitcoin.org/en/' }
			]
		}
	});
</script>

<Story name="Base" />
