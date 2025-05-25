<script lang="ts">
    import { weatherForecast } from "$lib/runes.svelte";
    import TempChart from "$lib/ui/TempChart.svelte";
</script>

<section class="section columns is-flex is-centered">
  <div class="column is-9">
      <div class="card">
          <header class="card-header">
              <p class="card-header-title has-text-primary is-size-4 is-centered">Forecast</p>
          </header>
          <div class="card-content has-text-centered"> 
                <table class="table is-fullwidth">
                    <tbody id="forecast-body">
                        <tr>
                            {#each weatherForecast.days as weekday}
                            <th class="has-text-centered has-text-link">{weekday.day}</th>
                            {/each}
                        </tr>
                        <tr>
                            {#each weatherForecast.days as weekday}
                            <td class="has-text-centered">
                                <span class="icon is-large">
                                    <img id="categ" src="https://openweathermap.org/img/wn/{weekday.icon}@2x.png" alt="weather-icon" >
                                </span>
                            </td>
                            {/each}
                        </tr>
                    </tbody>
                </table>
                <p class="card-header-title has-text-primary is-size-4 is-centered">Temperature</p>
                <TempChart />
          </div>
      </div>
  </div>
</section>