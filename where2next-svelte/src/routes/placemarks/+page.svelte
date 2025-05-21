<script lang="ts">
    import { loggedInUser, currentPlacemarks, subTitle, selectedCategory } from "$lib/runes.svelte";
    import { where2nextService } from "$lib/services/where2next-service";
    import PlacemarkCards from "./PlacemarkCards.svelte";
    import PlacemarkForm from "./PlacemarkForm.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import type { PlacemarkSpecPlus } from "$lib/types/where2next-types";

    subTitle.text = `Placemarks for ${selectedCategory.title}`;

    let map: LeafletMap;

    function placemarkAdded(placemark:PlacemarkSpecPlus) {
        map.addMarker(placemark.latitude, placemark.longitude, placemark.name);
    }

    onMount(async () => {    
        if (!loggedInUser.token) {
            where2nextService.restoreSession();
            selectedCategory._id = loggedInUser.categoryId;
            selectedCategory.title = loggedInUser.categoryName;
            subTitle.text = `Placemarks for ${selectedCategory.title}`;
        }
        if (loggedInUser.token) {
            currentPlacemarks.placemarks = await where2nextService.getPlacemarksByCategory(selectedCategory._id, loggedInUser.token);
        }
        console.log(currentPlacemarks.placemarks);
        currentPlacemarks.placemarks.forEach((placemark: PlacemarkSpecPlus) => {
        map.addMarker(placemark.latitude, placemark.longitude, placemark.name);
        });
    });
</script>

<section class="section columns is-flex is-centered is-multiline">
    <PlacemarkCards />
</section>
<LeafletMap bind:this={map} />
<PlacemarkForm newPlacemarkEvent={placemarkAdded}/>