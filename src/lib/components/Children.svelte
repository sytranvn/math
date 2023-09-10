<script>
	import Child from './Child.svelte';
	/** @type Array<string> */
	export let children = [];
	export let Component = Child;
	import { page } from '$app/stores';

	console.log('zz', children);
</script>

<ul>
	{#each children as [path, title]}
		<svelte:component this={Component}>
			<a href={$page.url.pathname + '/' + path}>{title}</a>
		</svelte:component>
	{/each}
</ul>
