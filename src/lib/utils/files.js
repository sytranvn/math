import path from 'node:path'
export async function getChildren(jsModules) {

	const titles = await Promise.all(
		Object.entries(jsModules)
			.map(([key, imp]) => ({ key, title: imp().then(m => m._title) }))
			.map(async ({ key, title }) => ({ key, title: await title }))
	)
	return titles.reduce((all, title) => {
		if (title.title) {
			const dir = path.dirname(title.key)
			all[dir] = title.title
		}
		return all
	}, /** @type {Record<string, string>}*/{})
}
