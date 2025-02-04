# @agnosticeng/dv

A lightweight, customizable data visualization library for Svelte applications.

## Features

- 📊 Interactive Data Table
  - Sortable columns
  - Resizable columns
  - Light/Dark theme support
  - Type-aware formatting
  - Fixed headers
  - Custom styling options

- 📈 Charts
  - Line charts
  - Candlestick charts
  - Responsive design
  - Automatic scaling
  - Multiple series support

## Installation

```bash
npm install @agnosticeng/dv
```

## Usage

### Data Table

```svelte
<script>
import { Table } from '@agnosticeng/dv';

const columns = [
  { name: 'id', type: 'Int32' },
  { name: 'name', type: 'String' },
  { name: 'date', type: 'DateTime' },
  { name: 'value', type: 'Float64' }
];

const data = [
  { id: 1, name: 'Item 1', date: '2023-01-01', value: 100.5 },
  { id: 2, name: 'Item 2', date: '2023-01-02', value: 200.75 }
];
</script>

<Table {data} {columns} theme="dark" />
```

### Charts

```svelte
<script>
import { Chart } from '@agnosticeng/dv';

const data = [
  { date: '2023-01-01', value: 100.5 },
  { date: '2023-01-02', value: 200.75 }
];

const settings = {
  chartType: 'line',
  xAxis: {
    series: ['date']
  },
  yAxis: {
    series: ['value']
  }
};
</script>

<Chart {data} {settings} />
```

## API Reference

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `Array<Object>` | required | Data to be displayed in the table |
| columns | `Array<Column>` | required | Column definitions |
| theme | `'light' \| 'dark'` | `'dark'` | Table theme |

### Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `Array<Object>` | required | Data to be visualized |
| settings | `ChartSettings` | required | Chart configuration |

### Types

```typescript
type Column = {
  name: string;
  type: string;
};

type ChartSettings = {
  chartType: 'candle' | 'line';
  xAxis: {
    series: string[];
  };
  yAxis: {
    series: string[];
  };
};
```

## Features

### Table
- Column sorting (click header)
- Column resizing (drag header edge)
- Automatic type formatting
- Alternating row colors
- Sticky headers
- Hover effects

### Charts
- Automatic scaling
- Responsive layout
- Multiple series support
- Grid lines
- Customizable margins
- Automatic tick formatting

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
