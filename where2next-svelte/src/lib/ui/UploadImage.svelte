<script lang="ts">
    import { where2nextService } from "$lib/services/where2next-service";
    import { loggedInUser, selectedCategory } from "$lib/runes.svelte";
    import { CldUploadWidget } from 'svelte-cloudinary';
    let { categoryId } = $props();

    let imagePath = "";

    function onSuccess(result: any, widget: any) {
        if(result.event === 'success') {
            imagePath = result.info.secure_url;
        }
        widget.close();
        console.log("Uploaded image url:", imagePath);
        // updateImg();
    }

    async function updateImg() {
        const response = await where2nextService.updateCategoryImage(selectedCategory._id, imagePath, loggedInUser.token);
        console.log('updating category:', selectedCategory._id, 'image url to', imagePath);
    }
</script>

<CldUploadWidget 
    uploadPreset="where2next-preset" let:open {onSuccess}>
    <button 
        onclick={() => open()} 
        class="button is-success is-outlined" 
        aria-label="upload">
        <i class="fas fa-folder-open"></i>
        Upload Image
    </button>
</CldUploadWidget>
