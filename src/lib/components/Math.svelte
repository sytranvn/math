<script>
	import katex from 'katex';
	export let source = '';
	$: html = katex.renderToString(source);
</script>

{@html html}
