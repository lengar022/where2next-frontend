<script lang="ts">
    import { goto } from "$app/navigation";
    import { selectedCategory } from "$lib/runes.svelte";
    
    let { placemarkList = [] } = $props();

    async function openWeather(placemarkId: string) {
        console.log(`openWeather function ran: ${placemarkId}`);
    }

</script>

{#each placemarkList as placemark}
    <div class="column is-4">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-size-4 is-centered">{placemark.name}</p>
            </header>
            <div class="card-image">
            <figure class="image is-square is-480by480">
                <img id="placemark-image-{placemark._id}" src={placemark.img} alt="placemark-img">
            </figure>
            </div>
            <div class="card-content">  
            <form action="/category/{selectedCategory._id}/uploadimage/{placemark._id}" method="POST" enctype="multipart/form-data">
                <div id="card{placemark._id}-fileselect" class="file has-name is-fullwidth">
                <label class="file-label"> <input id="file-input-{placemark._id}" class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span id="file-name-{placemark._id}" class="file-name"></span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
                </div>
            </form>
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
                    <tr>
                        <th>Forecast</th>
                        <td>
                            <a href="/category/{selectedCategory._id}/placemark/{placemark._id}/weather"  class="card-footer-item button is-info is-outlined" aria-label="open-weather">
                                <span class="icon is-small is-info">
                                    <i class="fas fa-cloud-sun"></i>
                                </span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer class="card-footer">
                <a href="/category/{selectedCategory._id}/deleteplacemark/{placemark._id}" class="card-footer-item button is-danger is-outlined" aria-label="delete-placemark">
                    <span class="icon is-small is-danger">
                        <i class="fas fa-trash"></i>
                    </span>
                </a>
            </footer>
        </div>
    </div>

    <script>
        result = document.getElementById(`placemark-image-${placemark._id}`).getAttribute('src') === '';
        if (result === false) {
            delete_icon_html = `<a href="/category/${selectedCategory._id}/deleteimage/${placemark._id}" class="button is-danger is-outlined"><i class="fas fa-trash"></i></a>`;
            document.getElementById(`card${placemark._id}-fileselect`).innerHTML += delete_icon_html;
        }
    </script>
{/each}