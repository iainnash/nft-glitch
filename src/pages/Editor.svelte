<script>
  import { onMount } from "svelte";

  import ReplWrapper from "../ReplWrapper.svelte";
  export let currentRoute;
  let loaded = false;
  let data = null;
  onMount(async () => {
    const { cid } = currentRoute.namedParams;
    try {
      if (currentRoute.namedParams.cid) {
        const page = await fetch(`https://ipfs.io/ipfs/${cid}`);
        const responseText = await page.text();
        const pageData = responseText.slice(responseText.indexOf("<!--SITE_SOURCE_TOKEN---"));
        data = {cid, data: JSON.parse(pageData)};
      }
    } catch (err) {
      console.error(err);
    }
    loaded = true;
  });
</script>

{#if loaded}
  <ReplWrapper dataContents={data} />
{:else}
  loading...
{/if}
