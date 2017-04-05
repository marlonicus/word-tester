/**
	Very basic TSV parsing function. Likely only works for the one file I am
	testing against :)
**/
export const parseTsv = data => {
	return data.split(`\n`)
	           .map(data => data.split(`\t`))
	           .map(arr => {
	           	return {
	           		occurences: arr[0],
	           		original: arr[1],
	           		translated: arr[2],
	           	}
	           })
	           .slice(1)
}


export const getRandomItem = arr => {
	const index = Math.floor(Math.random() * arr.length)
	return {
		index,
		value: arr[index],
	}
}

export const shuffle = arr => {
	if (!arr) return []
	let m = arr.length, t, i

	while (m) {
		i = Math.floor(Math.random() * m--)
		t = arr[m]
		arr[m] = arr[i]
		arr[i] = t
	}

	return arr
}
