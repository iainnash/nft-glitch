<script>
  import MintButton from './MintButton.svelte';

  export let cid;
  export let buy;
</script>

<div class="page">
  {#if buy}
  <p>
    Woah :o check out this masterpice.
    <MintButton htmlHash={cid} />
  </p>
  {/if}

  <iframe
    width="{buy ? '98%' : '100%'}"
    height="{buy ? '93%' : '100%'}"
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
    flex: 1;
  }
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  p {
    text-align: center;
    margin-top: 14px;
  }
</style>
