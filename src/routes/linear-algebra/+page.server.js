import { getChildren } from '$lib/utils/files'
const jsModules = import.meta.glob('./*/+page.{server.js,client.js,js}')

const allChildren = await getChildren(jsModules)
export function load() {
	return {
		children: Object.entries(allChildren)
	}
}

export const prerender = true
