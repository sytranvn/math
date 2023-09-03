import path from 'node:path'
const texSources = import.meta.glob('./*.tex', { eager: true, as: 'raw'})
const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const sortedSources = Object.keys(texSources).sort(collator.compare).map(
	f => ({
		name: path.basename(f).replace('.tex', ''),
		source: texSources[f]
	})
)
const groupedSources = sortedSources.reduce(
	/**
	 * @typedef {{name: string, source: string}} Source
	 * @param {Array<Source|Array<Source>>} grouped
	 * @param {Source} source 
         */
	(grouped, source) => {
	const [name, sub] = source.name.split('.')
	if (sub) {
		/**
		 * @type {Source[]}
		 */
		const group =  grouped[+name-1] || []
		group.push(source)
		grouped[+name-1] = group
	} else {
		grouped.push(source)
	}
	return grouped;
},  [])
export async function load() {
	return {
		sources: groupedSources
	}
}
