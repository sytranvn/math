import fs from 'node:fs/promises'

let dirs = (await fs.readdir('./src/routes', { withFileTypes: true})).filter(d => d.isDirectory()).map(d => d.name)


export async function load() {
	return { dirs }
}
