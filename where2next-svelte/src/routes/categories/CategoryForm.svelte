<script lang="ts">
    let categoryToAdd = $state("");

    async function addCategory() {
    console.log(`New category added: ${categoryToAdd}`);
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
