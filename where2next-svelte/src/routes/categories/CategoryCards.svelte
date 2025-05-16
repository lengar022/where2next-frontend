<script lang="ts">
    import { goto } from "$app/navigation";
    import { where2nextService } from "$lib/services/where2next-service";
    import { loggedInUser, selectedCategory, currentCategories } from "$lib/runes.svelte";

    let categoryId = $state("");
    let categoryName = $state("");

    async function openCategory(categoryId: string, categoryName : string) {
        console.log(`openCategory function ran: ${categoryName}`);
        selectedCategory._id = categoryId;
        selectedCategory.title = categoryName;
        goto("/placemarks");
    }

    async function deleteCategory(categoryId: string) {
        console.log(`deleteCategory function ran: ${categoryId}`);
        const success: boolean = await where2nextService.deleteCategory(categoryId, loggedInUser.token);
        if (success) {
            goto("/categories");
        } else {
            return;
        }
    }
</script>

{#each currentCategories.categories as category}
    <div class="column is-4">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-size-4 is-centered">{category.title}</p>
            </header>
            <div class="card-image">
            <figure class="image is-square is-480by480">
                <img id="category-image-{category._id}" src={category.img} alt="category-img">
                <button type="submit" class="button is-info">Upload</button>
            </figure>
            </div>
            <div class="card-content">  
            <form action="/dashboard/uploadimage/{category._id}" method="POST" enctype="multipart/form-data">
                <div id="card{category._id}-fileselect" class="file has-name is-fullwidth">
                <label class="file-label"> <input id="file-input-{category._id}" class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    </span>
                    <span id="file-name-{category._id}" class="file-name"></span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
                </div>
            </form>
            </div>
            <footer class="card-footer">
                <button onclick={() => openCategory(category._id, category.title)} class="card-footer-item button is-success is-outlined" aria-label="open"><i class="fas fa-folder-open"></i></button>
                <button onclick={() => deleteCategory(`${category._id}`)} class="card-footer-item button is-danger is-outlined" aria-label="delete"><i class="fas fa-trash"></i></button>
            </footer>
        </div>
    </div>
{/each}

  