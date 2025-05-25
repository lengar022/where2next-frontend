<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { weatherForecast } from "$lib/runes.svelte";
  import type { Forecast } from "$lib/types/where2next-types";

  let days: string[] = [];
  let temps: number[] = [];
  weatherForecast.days.forEach((forecast: Forecast) => {
    days.push(forecast.day);
    temps.push(forecast.temp);
  });

  let data = {
    labels: days,
    datasets: [
      {
        values: temps
      }
    ]
  };
</script>

<Chart data={data} type="line" />