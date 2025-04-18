import type { Data, Value } from '$lib/index.js';
import * as d3 from 'd3';

export default function bubble(
	size: { width: number; height: number },
	data: Data,
	axis: { x: string; y: string[]; z?: string }
): Node | undefined {
	const color = d3.scaleOrdinal(d3.schemeSpectral[10]);

	// Create the SVG container
	const svg = d3
		.create('svg')
		.attr('width', size.width)
		.attr('height', size.height)
		.attr('viewBox', [-size.width / 2, -size.height / 2, size.width, size.height])
		.attr('style', 'max-width: 100%; height: auto;');

	type DataNum = Data[number] & d3.SimulationNodeDatum & { radius: number; category: Value };

	const nodes: DataNum[] = data.map((d, i) => ({
		...d,
		radius: +d[axis.y[0]]! / 2,
		category: d[axis.x!]!,
		index: i
	}));

	// Create the simulation
	const simulation = d3
		.forceSimulation(nodes)
		.force('charge', d3.forceManyBody())
		.force(
			'collide',
			d3.forceCollide<DataNum>().radius((d) => d.radius + 2)
		)
		.force('x', d3.forceX())
		.force('y', d3.forceY());

	// Create the node elements
	const node = svg
		.append('g')
		.attr('stroke', '#fff')
		.attr('stroke-width', 1.5)
		.attr('fill-opacity', 0.8)
		.selectAll('circle')
		.data(nodes)
		.join('circle')
		.attr('r', (d) => d.radius)
		.attr('fill', (d) => color(d.category as string));

	node.append('title').text((d) => d.category as string);

	// @ts-expect-error bad typing
	node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

	// Update node positions on each tick
	simulation.on('tick', () => {
		node.attr('transform', (d) => `translate(${d.x},${d.y})`);
	});

	interface Subject extends d3.SubjectPosition {
		fx?: number | null;
		fy?: number | null;
	}

	// Reheat the simulation when drag starts, and fix the subject position.
	function dragstarted(event: d3.D3DragEvent<d3.DraggedElementBaseType, undefined, Subject>) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	// Update the subject (dragged node) position during drag.
	function dragged(event: d3.D3DragEvent<d3.DraggedElementBaseType, undefined, Subject>) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	// Restore the target alpha so the simulation cools after dragging ends.
	// Unfix the subject position now that it’s no longer being dragged.
	function dragended(event: d3.D3DragEvent<d3.DraggedElementBaseType, undefined, Subject>) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}

	return svg.node() ?? undefined;
}
