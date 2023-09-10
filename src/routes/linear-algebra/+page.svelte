<script>
	import Child from '$lib/components/Child.svelte';
	import Children from '$lib/components/Children.svelte';

	export let data;
</script>

<Children children={data.children} Component={Child} />
