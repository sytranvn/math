import { getTexSource as getTexSources } from "$lib/utils/tex"
const texModules = import.meta.glob('./*.tex', { eager: true, as: 'raw'})
export async function load() {
	return {
		sources: getTexSources(texModules)
	}
}
