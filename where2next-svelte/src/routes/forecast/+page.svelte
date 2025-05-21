<script lang="ts">
    import { subTitle, selectedPlacemark} from "$lib/runes.svelte";
    import WeatherForecast from "./WeatherForecast.svelte";

    subTitle.text = `This weeks forecast for ${selectedPlacemark.name}`;
</script>

<WeatherForecast />