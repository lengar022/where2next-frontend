<script lang="ts">
    import { goto } from "$app/navigation";
    import { loggedInUser, selectedCategory, currentPlacemarks, subTitle, allCategories} from "$lib/runes.svelte";
    import { where2nextService } from "$lib/services/where2next-service";
    import type { Category, PlacemarkSpecPlus } from "$lib/types/where2next-types";
    import CategorySelect from "$lib/ui/CategorySelect.svelte";
    import ImageGallery from "$lib/ui/ImageGallery.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";

    let selection = $state("All Categories");

    subTitle.text = "Browse our catelog of categories";
    let map: LeafletMap;

    onMount(async () => {    
        if (!loggedInUser.token) {
            where2nextService.restoreSession();
            subTitle.text = "Browse our catelog of categories";
        }
        if (loggedInUser.token) {
            allCategories.categories = await where2nextService.getAllCategories(loggedInUser.token);
        }
        buildMap("All Categories");
    });

    async function buildMap(id:string) {
        map.removeMarkers();
        if(id==="All Categories"){
            allCategories.categories.forEach((category: Category) => {
                category.placemarks.forEach((placemark: PlacemarkSpecPlus) => {
                    map.addMarker(placemark.latitude, placemark.longitude, placemark.name);
                });
            });
        } else {
            currentPlacemarks.placemarks = await where2nextService.getPlacemarksByCategory(id, loggedInUser.token);
            currentPlacemarks.placemarks.forEach((placemark: PlacemarkSpecPlus) => {
                map.addMarker(placemark.latitude, placemark.longitude, placemark.name);
            });
        }
    }

    async function openCategory(categoryId: string, categoryName : string) {
        const category = await where2nextService.getCategoryById(categoryId, loggedInUser.token);
        if (category) {
            where2nextService.saveSessionWithCategory(category._id, category.title);
            selectedCategory._id = category._id;
            selectedCategory.title = category.title;
        }
        goto("/placemarks");
    }

</script>



<section class="section box columns is-flex is-centered is-multiline">
    <ImageGallery />
</section>
<section class="section box columns is-flex is-centered is-multiline">
    <div class="column is-3">
        <CategorySelect bind:selection />
        {#if selection!="All Categories"}
            <button onclick={() => openCategory(selection, loggedInUser.token)} class="button is-success is-outlined" aria-label="open">
                <i class="fas fa-folder-open pr-2"></i>
                Open Category
            </button>
        {/if}
    </div>
    <div class="column is-9">
            {void buildMap(selection)}
            <LeafletMap bind:this={map} />
    </div>
</section>
