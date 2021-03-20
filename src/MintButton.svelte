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
  let creatorShare;
  export let htmlHash;

  async function doMint() {
    console.log("MINT!!!");
    minting = true;
    console.log(provider.getSigner());

    const metaHash = await fetch("/api/mint-setup", {
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        htmlHash,
      }),
    });
    const metaResponse = await metaHash.json();

    const zora = new Zora(provider.getSigner(), 4);

    if (!metaResponse.isVerified) {
      throw new Error("NOT VERIFIED");
    }

    const bidShares = constructBidShares(
      10, // creator share
      90, // owner share
      0 // prevOwner share
    );
    const tx = await zora.mint(metaResponse.mediaData, bidShares);
    tx.wait(8).then((a) => {
      console.log(a);
      minting = false;
    }); // 8 confirmations to finalize
  }

  async function connect() {
    await window.ethereum.enable();
    provider = new Web3Provider(window.ethereum);
    console.log("address", await provider.getSigner().getAddress());
    provider.on("network", (newNetwork, oldNetwork) => {
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
        <input bind:value={name} placeholder="piece name" type="text" />
      </label>
    </p>
    <p>
      <label>
        <span class="txt">description</span>
        <input
          bind:value={description}
          placeholder="your description"
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
          step="1"
          value="10"
          type="range"
        />
      </label>
    </p>
    <button on:click={mint}>Mint!</button>
  </div>
{:else}
  <button on:click={connect}>Connect your Wallet</button>
{/if}

<style>
  .txt {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
</style>
