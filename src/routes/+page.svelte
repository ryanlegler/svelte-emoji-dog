<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
	export let results: any[];
	$: results = form?.results || [];
</script>

<form
	method="POST"
	use:enhance={() => {
		console.log('enhanced');
	}}
>
	<label>
		Search
		<input type="text" name="search" />
	</label>
	<button type="submit">Submit</button>

	{#if form?.search}
		<h1>Results for "{form?.search}"</h1>
	{/if}

	{#if results}
		{#each results as result}
			<div>
				{result?.item?.name}
				{result?.item?.character}
			</div>
		{/each}
	{/if}
</form>
