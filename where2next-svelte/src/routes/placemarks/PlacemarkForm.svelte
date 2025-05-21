<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser, selectedCategory } from "$lib/runes.svelte";
  import { where2nextService } from "$lib/services/where2next-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  let { newPlacemarkEvent = null } = $props();

  let name = $state("");
  let description = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let message = $state("Add a placemark here!");
  
  async function addPlacemark() {
    const placemarkToAdd = {
      name: name,
      description: description,
      latitude: lat,
      longitude: lng,
      categoryid: selectedCategory._id,
    }
    console.log(`New placemark added: ${name}`);
    if ( name && description ) {
        const placemark = await where2nextService.createPlacemark(placemarkToAdd, loggedInUser.token);
        if (!placemark) {
          message = "Failed to add placemark - some error occurred";
          return;
        }
        if (newPlacemarkEvent) newPlacemarkEvent(placemark);
        message = `You added a new placemark: ${name}`;
      } else {
      message = "Please give the placemark a name";
    }
  }
</script>
  
<div>
  <div class="field">
    <label class="label" for="name">Would you like to add a new placemark?</label>
    <input bind:value={name} class="input" id="name" name="name" type="string" placeholder="Enter Placemark Name" />
    <input bind:value={description} class="input" id="description" name="description" type="string" placeholder="Enter Description Here" />
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button onclick={() => addPlacemark()} class="button is-success is-fullwidth">Add Placemark</button>
    </div>
  </div>
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
  

