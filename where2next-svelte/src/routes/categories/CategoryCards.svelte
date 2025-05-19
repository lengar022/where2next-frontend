<script lang="ts">
    import { goto } from "$app/navigation";
    import { where2nextService } from "$lib/services/where2next-service";
    import { loggedInUser, selectedCategory, currentCategories } from "$lib/runes.svelte";
    import UploadImage from "$lib/ui/UploadImage.svelte";
    import UploadWidget from "$lib/ui/UploadWidget.svelte";
    
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
            let widget = window.cloudinary.openUploadWidget({
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

    async function updateCategoryImage() {
        console.log('xxxxxxximage url', imagePath);
        const response = await where2nextService.updateCategoryImage(category_id, imagePath, loggedInUser.token);
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
            <div class="card-content">  
                <button onclick={() => uploadImage(category._id)} class="card-footer-item button is-danger is-outlined" aria-label="open"><i class="fas fa-folder-open"></i></button>
            </div>
            <footer class="card-footer">
                <button onclick={() => openCategory(category._id, category.title)} class="card-footer-item button is-success is-outlined" aria-label="open"><i class="fas fa-folder-open"></i></button>
                <button onclick={() => deleteCategory(`${category._id}`)} class="card-footer-item button is-danger is-outlined" aria-label="delete"><i class="fas fa-trash"></i></button>
            </footer>
        </div>
    </div>
{/each}

  
  