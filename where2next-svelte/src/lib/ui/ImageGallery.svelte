<script lang="ts">
    import { currentCategories } from "$lib/runes.svelte";

</script>

{#each currentCategories.categories as category }
    {#if category.img != "https://bulma.io/assets/images/placeholders/480x480.png" }
        <div class="column is-1">
            <figure class="image is-128x128">
                <img class="is-rounded" src={category.img} alt="gallery-img">
            </figure>
        </div>
    {/if}
    {#each category.placemarks as placemark }
        {#if placemark.img != "https://bulma.io/assets/images/placeholders/480x480.png" }
            <div class="column is-1">
                <figure class="image is-128x128">
                    <img class="is-rounded" src={placemark.img} alt="gallery-img">
                </figure>
            </div>
        {/if}
    {/each}
{/each}