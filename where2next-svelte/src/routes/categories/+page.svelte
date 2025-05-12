<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import CategoryCards from "$lib/ui/CategoryCards.svelte";
    import CategoryForm from "./CategoryForm.svelte";
    subTitle.text = "Categories";
</script>

<CategoryCards />
<CategoryForm />
  