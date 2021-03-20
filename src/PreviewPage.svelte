<script>
  import MintButton from './MintButton.svelte';

  export let cid;
</script>

<div class="page">
  <p>
    Woah :o check out this masterpice.
    <MintButton />
  </p>

  <iframe
    width="80%"
    height="80%"
    class="frame"
    title="Site preview"
    src="https://ipfs.io/ipfs/{cid}">loading...</iframe
  >
</div>

<style>
  .frame {
    border: 0;
    margin: 10px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
  }
  .page {
    display: flex;
    flex-direction: row;
  }
</style>
