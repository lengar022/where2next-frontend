<script lang="ts">
    import { loggedInUser, subTitle, selectedCategory } from "$lib/runes.svelte";
    import { where2nextService } from "$lib/services/where2next-service";
    import PlacemarkCards from "./PlacemarkCards.svelte";
    import PlacemarkForm from "./PlacemarkForm.svelte";
    import { onMount } from "svelte";
    import type { Placemark } from "$lib/types/where2next-types";

    subTitle.text = `Placemarks for ${selectedCategory.title}`;

    let placemarkList: Placemark[] = $state([]);

    onMount(async () => {
        const category = await where2nextService.getCategoryById(selectedCategory._id, loggedInUser.token);
        placemarkList = category.placemarks;
    });
</script>

<section class="section columns is-flex is-centered is-multiline">
    <PlacemarkCards {placemarkList} />
</section>

<PlacemarkForm />