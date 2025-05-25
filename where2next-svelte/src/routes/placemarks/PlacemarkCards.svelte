<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { where2nextService } from "$lib/services/where2next-service";
    import { loggedInUser , selectedCategory, currentCategories, weatherForecast, selectedPlacemark} from "$lib/runes.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { Category, PlacemarkSpecPlus } from "$lib/types/where2next-types";

    let imagePath = $state("fff");
    let placemark_id = $state("ggg");

    function uploadImage(placemarkId: string) {
        placemark_id = placemarkId;
        console.log(`uploading image for placemark: ${placemarkId}`);
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
                    updatePlacemarkImage();
                }
            })
        }
    }
    async function deleteImage(placemarkId: string) {
        const response = await where2nextService.deletePlacemarkImage(placemarkId, loggedInUser.token);
        console.log(response);
        console.log("image deleted for placemark", placemarkId);
    }

    async function updatePlacemarkImage() {
        console.log('xxxxxxximage url', imagePath);
        const response = await where2nextService.updatePlacemarkImage(placemark_id, imagePath, loggedInUser.token);
        console.log(response);
        console.log("image updated for placemark", placemark_id);
    }

    async function openWeather(placemarkId: string, placemarkName: string) {
        console.log(`openWeather function ran: ${placemarkId}`);
        selectedPlacemark._id = placemarkId;
        selectedPlacemark.name = placemarkName;
        weatherForecast.days = await where2nextService.getPlacemarkForecast(placemarkId, loggedInUser.token);
        goto("/forecast");
    }

    async function deletePlacemark(placemarkId: string) {
        console.log(`delete Placemark function ran: ${placemarkId}`);
        const success: boolean = await where2nextService.deletePlacemark(placemarkId, loggedInUser.token);
    }

</script>

{#each currentCategories.categories as category}
    {#if category._id === selectedCategory._id }
        {#each category.placemarks as placemark}
            <div class="column is-4">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-size-4 is-centered">{placemark.name}</p>
                    </header>
                    <LeafletMap height={30} id={placemark._id} latitude={placemark.latitude} longitude={placemark.longitude} name={placemark.name} zoom={9}/>
                    <div class="card-image">
                    <figure class="image is-square is-480by480">
                        <img id="placemark-image-{placemark._id}" src={placemark.img} alt="placemark-img">
                    </figure>
                    </div>
                    <div class="card-content columns is-centered">  
                        <button onclick={() => uploadImage(placemark._id)} class="column card-footer-item button is-success is-outlined" aria-label="upload-image">
                            <i class="fas fa-upload pr-2"></i>
                            Upload Image
                        </button>
                        {#if placemark.img != "https://bulma.io/assets/images/placeholders/480x480.png" }
                            <button onclick={() => deleteImage(placemark._id)} class="column card-footer-item button is-danger is-outlined" aria-label="delete-image">
                                <i class="fas fa-trash pr-2"></i>
                                Delete Image
                            </button>
                        {/if}
                    </div>
                    <table class="table is-fullwidth">
                        <tbody>
                            <tr>
                                <th>Placemark</th>
                                <td>{placemark.name}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{placemark.description}</td>
                            </tr>
                            <tr>
                                <th>Latitude</th>
                                <td>{placemark.latitude}</td>
                            </tr>
                            <tr>
                                <th>Longitude</th>
                                <td>{placemark.longitude}</td>
                            </tr>
                        </tbody>
                    </table>
                    <footer class="card-footer">
                        <button onclick={() => openWeather(placemark._id, placemark.name)} class="card-footer-item button is-success" aria-label="weather-forecast">
                            <i class="fas fa-cloud-sun pr-2"></i>
                            See Forecast
                        </button>
                        <button onclick={() => deletePlacemark(`${placemark._id}`)} class="card-footer-item button is-danger" aria-label="delete">
                            <i class="fas fa-trash pr-2"></i>
                            Delete Placemark
                        </button>
                    </footer>
                </div>
            </div>
        {/each}
    {/if}
{/each}