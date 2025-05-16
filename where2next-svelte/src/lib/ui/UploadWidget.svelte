<script>
    import { onMount } from "svelte";

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
                }
            })
        }
    }

</script>

<button on:click|preventDefault={handleClick} class="button is-success is-outlined" aria-label="upload"><i class="fas fa-folder-open"></i>Upload Image</button>
<button on:click|preventDefault={handleClick} class="button is-success is-outlined" aria-label="upload"><i class="fas fa-folder-open"></i>{imagePath}</button>