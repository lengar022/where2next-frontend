<script lang="ts">
    import type { Category } from "$lib/types/where2next-types";
    import { where2nextService } from "$lib/services/where2next-service";
    import { getCldImageUrl } from "svelte-cloudinary";
    import { loggedInUser, selectedCategory } from "$lib/runes.svelte";
    let { category } = $props();
    /**
     * @type {{ open: () => void; }}
     */
    let widget;
    let imagePath = $state("");

    // @ts-ignore
    function handleClick() {
        if ('cloudinary' in window) {
            // @ts-ignore
            widget = window.cloudinary.openUploadWidget({
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
                }
            })
        }

    async function updateImg() {
        const response = await where2nextService.updateCategoryImage(categoryId, imagePath, loggedInUser.token);
        console.log('updating category:', categoryId, 'image url to', imagePath);
    }
    }
</script>

<!-- svelte-ignore event_directive_deprecated -->
<button on:click|preventDefault={handleClick} class="button is-success is-outlined" aria-label="upload"><i class="fas fa-folder-open"></i>Upload Image</button>