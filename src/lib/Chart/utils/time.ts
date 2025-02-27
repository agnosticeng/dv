export const time = (x: string) => (d: { [key: string]: string | number }) => {
	const val = d[x];
	const date = new Date(val);
	return isNaN(date.getTime()) ? val : date;
};
