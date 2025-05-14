<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import { where2nextService } from "$lib/services/where2next-service";
    import CategoryCards from "./CategoryCards.svelte";
    import CategoryForm from "./CategoryForm.svelte";
    import { onMount } from "svelte";
    import type { Category } from "$lib/types/where2next-types";

    subTitle.text = "Categories";

    let categoryList: Category[] = $state([]);

    onMount(async () => {
        categoryList = await where2nextService.getUserCategories(loggedInUser._id, loggedInUser.token);
    });
</script>

<CategoryCards {categoryList} />
<CategoryForm />
  