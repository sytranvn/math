<script>
	import katex from 'katex';
	export let source = '';
	export let displayMode = true;
	$: html = katex.renderToString(source, { displayMode });
</script>

{@html html}

<style>
	:global(.katex-display > .katex) {
		padding-left: 6rem;
		text-align: left;
	}
</style>
