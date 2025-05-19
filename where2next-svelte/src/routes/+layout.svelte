<script lang="ts">
  import { browser } from "$app/environment";
  import { loggedInUser } from "$lib/runes.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import { onMount } from "svelte";
  import { where2nextService } from "$lib/services/where2next-service";
  import { configureCloudinary } from 'svelte-cloudinary';

  configureCloudinary({
    cloudName: "dl4yq0hkm",
  });

  onMount(async () => {
    await where2nextService.restoreSession();
  });

</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
