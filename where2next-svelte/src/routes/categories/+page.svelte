<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import UploadWidget from "$lib/ui/UploadWidget.svelte";
    import CategoryCards from "./CategoryCards.svelte";
    import CategoryForm from "./CategoryForm.svelte";

    subTitle.text = "Categories";

</script>

<section class="section columns is-flex is-centered is-multiline">
    <CategoryCards />
</section>
<CategoryForm />

<UploadWidget />