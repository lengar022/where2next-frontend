<script lang="ts">
    export let categories = [
        {
            "_id": "67eb98eb95c4bf46810bf86d",
            "title": "Beaches",
            "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742734786/x7rvpmjufdt6lbnrsq58.png",
            "userid": "67eb98eb95c4bf46810bf86b",
            "__v": 0,
            "placemarks": [
            {
                "_id": "67eb98eb95c4bf46810bf877",
                "name": "Ballybunion",
                "description": "Amazing beach located in the North of Kerry",
                "latitude": 52.513098,
                "longitude": -9.676056,
                "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742737895/fpjqjundyy46a9zmxkpn.png",
                "categoryid": "67eb98eb95c4bf46810bf86d",
                "__v": 0
            },
            {
                "_id": "67eb98eb95c4bf46810bf879",
                "name": "Ballyheigue",
                "description": "Nice beach located just outside Tralee, Co Kerry",
                "latitude": 52.387053,
                "longitude": -9.834495,
                "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743027/ammvmhjvisjxyns2cgbu.png",
                "categoryid": "67eb98eb95c4bf46810bf86d",
                "__v": 0
            },
            {
                "_id": "67eb98eb95c4bf46810bf87b",
                "name": "Inchydoney",
                "description": "Inchydoney Blue Flag Beach near Clonakilty in West Cork",
                "latitude": 51.596505,
                "longitude": -8.865753,
                "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743011/wsb0izu9oiceg85rucy8.png",
                "categoryid": "67eb98eb95c4bf46810bf86d",
                "__v": 0
            }
            ]
        },
        {
            "_id": "67eb98eb95c4bf46810bf86f",
            "title": "Green Ways",
            "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742735353/slzjromkdkoqdduiftwj.png",
            "userid": "67eb98eb95c4bf46810bf86b",
            "__v": 0,
            "placemarks": [
            {
                "_id": "67eb98eb95c4bf46810bf87d",
                "name": "Bother Glas",
                "description": "Walkway along the river Clyda in Mourneabbey",
                "latitude": 52.069913,
                "longitude": -8.638435,
                "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743260/d8snwaz9qdmzcibuntvu.png",
                "categoryid": "67eb98eb95c4bf46810bf86f",
                "__v": 0
            },
            {
                "_id": "67eb98eb95c4bf46810bf87f",
                "name": "Waterford Greenway",
                "description": "Former railway track in Waterford now used for cycling and hiking",
                "latitude": 52.26991,
                "longitude": -7.138,
                "img": "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743418/ncvqpsuilxjodzpd7nsh.png",
                "categoryid": "67eb98eb95c4bf46810bf86f",
                "__v": 0
            }
            ]
        }
    ];
</script>

<section class="section columns is-flex is-centered is-multiline">
    {#each categories as category}
    <div class="column is-3">
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
            <form action="/dashboard/uploadimage/{category._id}" method="POST" enctype="multipart/form-data">
                <div id="card{category._id}-fileselect" class="file has-name is-fullwidth">
                <label class="file-label"> <input id="file-input-{category._id}" class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span id="file-name-{category._id}" class="file-name"></span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
                </div>
            </form>
            </div>
            <footer class="card-footer">
              <a href="/placemarks" class="card-footer-item button is-primary is-outlined" aria-label="go-to-placemarks">
                <span class="icon is-small">
                  <i class="fas fa-folder-open"></i>
                </span>
              </a>
            </footer>
        </div>
    </div>
    {/each}
</section>

  