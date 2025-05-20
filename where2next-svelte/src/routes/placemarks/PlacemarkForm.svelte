<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser, selectedCategory } from "$lib/runes.svelte";
  import { where2nextService } from "$lib/services/where2next-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  
  let placemarkToAdd = $state("");
  let message = $state("Add a placemark here!");
  let name = $state("");
  let discription = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  
    async function addPlacemark() {
      console.log(`New placemark added: ${placemarkToAdd}`);
      if (placemarkToAdd) {
          const success: boolean = await where2nextService.createPlacemark(placemarkToAdd, loggedInUser._id, loggedInUser.token);
          if (!success) {
            message = "Failed to add placemark - some error occurred";
            return;
          }
          message = `You added a new placemark: ${placemarkToAdd}`;
          goto("/categories");
        } else {
        message = "Please give the placemark a name";
      }
    }
  </script>
  
  <div>
    <div class="field">
      <label class="label" for="placemarkToAdd">Would you like to add a new placemark?</label>
      <input bind:value={placemarkToAdd} class="input" id="placemarkToAdd" name="placemarkToAdd" type="string" placeholder="Enter Placemark Name" />
    </div>
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
  

<div>
  <div class="field">
    <label class="label" for="amount">Enter Amount:</label>
    <input bind:value={amount} class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Payment Method:</label>
      {#each paymentMethods as method}
        <input bind:group={selectedMethod} class="radio" type="radio" value={method} /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="amount">Select Candidate:</label>
    <div class="select">
      <select bind:value={selectedCandidate}>
        {#each currentCandidates.candidates as candidate}
          <option value={candidate._id}>{candidate.lastName},{candidate.firstName}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
<Coordinates bind:lat bind:lng />
<div class="field">
  <div class="control">
    <button onclick={() => donate()} class="button is-success is-fullwidth">Donate</button>
  </div>
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>