<script>
  import PreviewPage from "../PreviewPage.svelte";
  export let currentRoute;
</script>

<div class="full">
  <h2>congrats! 🎉</h2>
  <h3>✔ you're published on IPFS</h3>

  <PreviewPage cid={currentRoute.namedParams.cid} />
</div>

<style>
  .full {
    text-align: center;
    margin-top: 20px;
    min-height: 100%;
    font-size: 1.9em;
  }
</style>
