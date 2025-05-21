<script lang="ts">
    import { loggedInUser, subTitle, selectedCategory } from "$lib/runes.svelte";
    import PlacemarkCards from "./PlacemarkCards.svelte";
    import PlacemarkForm from "./PlacemarkForm.svelte";

    subTitle.text = `Placemarks for ${selectedCategory.title}`;

</script>

<section class="section columns is-flex is-centered is-multiline">
    <PlacemarkCards />
</section>

<PlacemarkForm />