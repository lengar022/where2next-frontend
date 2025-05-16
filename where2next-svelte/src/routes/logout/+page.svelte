<script lang="ts">
    import { goto } from "$app/navigation";
    import { where2nextService } from "$lib/services/where2next-service";

    where2nextService.clearSession();
    goto("/");
  </script>
  