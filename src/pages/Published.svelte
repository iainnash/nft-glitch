<script>
  import PreviewPage from "../PreviewPage.svelte";
  export let currentRoute;
</script>

<style>
</style>

<h2>congrats! 🎉</h2>
<h3>you're published on IPFS</h3>

<h3>
  <a title="connect" href="javascript:">connect your wallet</a> to publish as an
  NFT
</h3>

<PreviewPage cid={currentRoute.namedParams.cid} />
