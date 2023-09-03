import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { rssPlugin } from 'vite-plugin-rss';

export async function listFiles(dir) {
	const results = []
	const files = await fs.readdir(dir, { withFileTypes: true, recursive: true })
	for await (const file of files) {
		if (file.isFile()) {
			results.push(path.join(dir, file.name))
		} else {
			results.push(...await listFiles(path.join(dir, file.name)))
		}
	}

	return results;
}

const dir = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(dir, './src/routes')
let pages = await listFiles(src)
pages = await Promise.all(pages
	.filter(f => path.basename(f) === '+page.svelte')
	.map(async f => ({
		name: path.relative(src, f.replace('+page.svelte', '')),
		pubDate: (await fs.stat(f)).mtime
	})))

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const BASE_URL = env.BASE_URL

	return {
		plugins: [
			sveltekit(),
			rssPlugin({
				mode: "define",
				channel: {
					title: "Sy Tran - Math",
					link: BASE_URL,
					lastBuildDate: new Date(),
					description: `Recent change on Sy Tran - Math`
				},
				items: pages.map(page => ({ link: `${BASE_URL}/${page.name}`, pubDate: page.pubDate })),
			})]
	}
})

