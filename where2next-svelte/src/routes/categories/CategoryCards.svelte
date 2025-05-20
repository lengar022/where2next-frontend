<script lang="ts">
    import { goto } from "$app/navigation";
    import { where2nextService } from "$lib/services/where2next-service";
    import { loggedInUser, selectedCategory, currentCategories } from "$lib/runes.svelte";

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
    
    let imagePath = $state("fff");
    let category_id = $state("ggg");

    function uploadImage(categoryId: string) {
        category_id = categoryId;
        console.log(`uploading image for category: ${categoryId}`);
        if ('cloudinary' in window) {
            // @ts-ignore
                window.cloudinary.openUploadWidget({
                cloudName: 'dl4yq0hkm',
                uploadPreset: 'where2next-preset',
                sources: ['local', 'camera'],
            // @ts-ignore
            }, (error, result) => {
                if (error) {
                    console.error('Upload Error:', error);
                } else if (result.event === 'success') {
                    console.log('Upload Success:', result.info.secure_url);
                    // @ts-ignore
                    imagePath = result.info.secure_url;
                    console.log('image url', imagePath);
                    updateCategoryImage();
                }
            })
        }
    }
    async function deleteImage(categoryId: string) {
        const response = await where2nextService.deleteCategoryImage(categoryId, loggedInUser.token);
        console.log(response);
        console.log("image deleted for category", categoryId);
    }

    async function updateCategoryImage() {
        console.log('xxxxxxximage url', imagePath);
        const response = await where2nextService.updateCategoryImage(category_id, imagePath, loggedInUser.token);
        console.log(response);
        console.log("image updated for category", category_id);
    }
</script>

{#each currentCategories.categories as category }
    <div class="column is-4">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-size-4 is-centered">{category.title}</p>
            </header>
            <div class="card-image">
            <figure class="image is-square is-480by480">
                <img id="category-image-{category._id}" src={category.img} alt="category-img">
            </figure>
            </div>
            <div class="card-content columns is-centered">  
                <button onclick={() => uploadImage(category._id)} class="column card-footer-item button is-success is-outlined" aria-label="upload-image">
                    <i class="fas fa-upload pr-2"></i>
                    Upload Image
                </button>
                {#if category.img != "https://bulma.io/assets/images/placeholders/480x480.png" }
                    <button onclick={() => deleteImage(category._id)} class="column card-footer-item button is-danger is-outlined" aria-label="delete-image">
                        <i class="fas fa-trash pr-2"></i>
                        Delete Image
                    </button>
                {/if}
            </div>
            <footer class="card-footer">
                <button onclick={() => openCategory(category._id, category.title)} class="card-footer-item button is-success" aria-label="open">
                    <i class="fas fa-folder-open pr-2"></i>
                    Open Category
                </button>
                <button onclick={() => deleteCategory(`${category._id}`)} class="card-footer-item button is-danger" aria-label="delete">
                    <i class="fas fa-trash pr-2"></i>
                    Delete Category
                </button>
            </footer>
        </div>
    </div>
{/each}

  
  