<script lang="ts">
    import { allCategories } from "$lib/runes.svelte";

    let { selection = $bindable("") } = $props();

</script>

<div class="field">
    <label class="label" for="selected-category">Select Category:</label>
    <div class="select is-success">
        <select bind:value={selection}>
            <option value="All Categories">All Categories</option>
            {#each allCategories.categories as category}
                <option value={category._id}>{category.title}</option>
            {/each}
        </select>
    </div>
</div>
