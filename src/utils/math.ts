export const getPositiveModulo = (x: number, mod: number) => {
	const modulode = x % mod;
	return modulode < 0 ? modulode + mod : modulode;
};

export const romanize = (num: number): string => {
	if (isNaN(num)) return 'NaN';
	const digits = String(+num).split('') ?? [];
	const key = [
		'',
		'C',
		'CC',
		'CCC',
		'CD',
		'D',
		'DC',
		'DCC',
		'DCCC',
		'CM',
		'',
		'X',
		'XX',
		'XXX',
		'XL',
		'L',
		'LX',
		'LXX',
		'LXXX',
		'XC',
		'',
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII',
		'IX'
	];
	let roman = '';
	let i = 3;
	while (i--) {
		roman = (key[+(digits.pop() ?? '') + i * 10] || '') + roman;
	}
	return Array(+digits.join('') + 1).join('M') + roman;
};

export const sumIntervals = (startIndex: number, endIndex: number, intervals: number[]) => {
	let sum = 0;
	for (let i = startIndex; i < endIndex; i++) {
		sum += intervals[getPositiveModulo(i, intervals.length)];
	}
	return sum;
};

export const getOrdinalSuffixed = (i: number) => {
	const j = i % 10,
		k = i % 100;
	if (j === 1 && k !== 11) {
		return i + 'st';
	}
	if (j === 2 && k !== 12) {
		return i + 'nd';
	}
	if (j === 3 && k !== 13) {
		return i + 'rd';
	}
	return i + 'th';
};
