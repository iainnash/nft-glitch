<script>
  import { Zora } from "@zoralabs/zdk";
  import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
  import {
    constructBidShares,
    constructMediaData,
    sha256FromBuffer,
    generateMetadata,
    isMediaDataVerified,
  } from "@zoralabs/zdk";

  let minting = false;
  let provider = null;

  async function mint() {
    setTimeout(doMint, 20);
  }

  let name;
  let description;
  let creatorShare = 10;
  let network;
  export let htmlHash;

  async function doMint() {
    console.log("MINT!!!");
    minting = true;
    console.log(provider.getSigner());

    const metaHash = await fetch("/api/mint-setup", {
      headers: {
        "content-type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        htmlHash,
      }),
    });
    const metaResponse = await metaHash.json();

    const zora = new Zora(provider.getSigner(), 4);

    // if (!metaResponse.isVerified) {
    //   alert('internal verification error ~~ sad');
    //   throw new Error("NOT VERIFIED");
    // }

    const bidShares = constructBidShares(
      10, // creator share
      90, // owner share
      0 // prevOwner share
    );
    const tx = await zora.mint(metaResponse.mediaData, bidShares);
    tx.wait(8).then((a) => {
      console.log(a);
      console.log(tx);
      debugger
      minting = false;
    }); // 8 confirmations to finalize
  }

  async function connect() {
    await window.ethereum.enable();
    provider = new Web3Provider(window.ethereum);
    console.log("address", await provider.getSigner().getAddress());
    provider.on("network", (newNetwork, oldNetwork) => {
      network = newNetwork;
      console.log({ oldNetwork, newNetwork });
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });
    // console.log(provider)

    // const signer = provider.getSigner();
  }
</script>

{#if provider}
  <div class="main">
    <p>
      <label>
        <span class="txt">title</span>
        <input disabled={minting} bind:value={name} placeholder="piece name" type="text" />
      </label>
    </p>
    <p>
      <label>
        <span class="txt">description</span>
        <input
          bind:value={description}
          placeholder="your description"
          disabled={minting}
          type="text"
        />
      </label>
    </p>
    <p>
      <label>
        <span class="txt">creator share ({creatorShare}%)</span>
        <input
          bind:value={creatorShare}
          placeholder="creator share"
          min="0"
          max="30"
          disabled={minting}
          step="1"
          type="range"
        />
      </label>
    </p>
    {#if minting}
      minting...
    {:else}
      <button on:click={mint}>Mint!</button>
    {/if}
  </div>
{:else}
  <button on:click={connect}>Connect your Wallet</button>
{/if}

<style>
  .main {
    font-size: 0.8em;
  }
  button {
    border: 1px #999 solid;
    border-radius: 4px;
    padding: 3px;
    margin: 10px;
  }
  .txt {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
</style>
