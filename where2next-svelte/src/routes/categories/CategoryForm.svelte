<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { where2nextService } from "$lib/services/where2next-service";

  let categoryToAdd = $state("");
  let message = $state("Add a category here!");

  async function addCategory() {
    console.log(`New category added: ${categoryToAdd}`);
    if (categoryToAdd) {
        const success: boolean = await where2nextService.createCategory(categoryToAdd, loggedInUser._id, loggedInUser.token);
        if (!success) {
          message = "Failed to add category - some error occurred";
          return;
        }
        message = `You added a new category: ${categoryToAdd}`;
        categoryToAdd = "";
      } else {
      message = "Please give the category a name";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="categoryToAdd">Would you like to add a new category?</label>
    <input bind:value={categoryToAdd} class="input" id="categoryToAdd" name="categoryToAdd" type="string" placeholder="Enter Category Name" />
  </div>
  <div class="field">
    <div class="control">
      <button onclick={() => addCategory()} class="button is-success is-fullwidth">Add Category</button>
    </div>
  </div>
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
