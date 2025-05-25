<script lang="ts">
    import { subTitle, selectedPlacemark} from "$lib/runes.svelte";
    import TempChart from "$lib/ui/TempChart.svelte";
    import WeatherForecast from "./WeatherForecast.svelte";

    subTitle.text = `This weeks forecast for ${selectedPlacemark.name}`;
</script>

<WeatherForecast />