<script>
	import Math from '$lib/components/Math.svelte';
	export let data;
</script>

<ol>
	{#each data.sources as file}
		<li>
			&nbsp;
			{#if Array.isArray(file)}
				<ol>
					{#each file as subfile}
						<li style="list-style: lower-alpha;">
							&nbsp;
							<p>
								<Math source={subfile.source} />
							</p>
						</li>
					{/each}
				</ol>
			{:else}
				<p>
					<Math source={file.source} />
				</p>
			{/if}
		</li>
	{/each}
</ol>
