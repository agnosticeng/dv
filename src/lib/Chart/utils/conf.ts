import { axisY, type PlotOptions } from '@observablehq/plot';
import * as d3 from 'd3';

export default {
	marginTop: 15,
	marginRight: 15,
	marginBottom: 30,
	marginLeft: 40,
	grid: true,
	x: {
		label: null,
		labelArrow: false
	},
	marks: [
		axisY({
			textOverflow: 'ellipsis',
			lineWidth: 3,
			text: (d) => (typeof d === 'number' ? d3.format('.2s')(d) : d),
			label: null,
			labelArrow: false
		})
	]
} satisfies PlotOptions;
