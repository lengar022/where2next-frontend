<script lang="ts">
  import SplashScreen from "$lib/ui/SplashScreen.svelte";
  import ImageGallery from '@react2svelte/image-gallery';

  const images = [
    {
      original: "/welcome-img.jpg",
      thumbnail: "/welcome-img.jpg"
    },
    {
      original: "/welcome-img.jpg",
      thumbnail: "/welcome-img.jpg"
    },
    {
      original: "/welcome-img.jpg",
      thumbnail: "/welcome-img.jpg"
    }
  ];
</script>
  
<SplashScreen />

<ImageGallery items="{images}" />

