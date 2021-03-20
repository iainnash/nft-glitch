<script>
  import { Zora } from "@zoralabs/zdk";
  import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
  import {
    constructBidShares,
    constructMediaData,
    sha256FromBuffer,
    generateMetadata,
    isMediaDataVerified
  } from "@zoralabs/zdk";

  let minting = false;
  let provider = null;

  async function mint() {
    setTimeout(doMint, 20);
  }

  async function doMint() {
    minting = true;
    console.log(provider.getSigner());
    const zora = new Zora(provider.getSigner(), 4);
    const metadataJSON = generateMetadata("zora-20210101", {
      description: "",
      mimeType: "text/plain",
      name: "",
      version: "zora-20210101"
    });
    const contentHash = sha256FromBuffer(Buffer.from("Ours Truly,"));
    const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
    const mediaData = constructMediaData(
      "https://ipfs.io/ipfs/bafybeifyqibqlheu7ij7fwdex4y2pw2wo7eaw2z6lec5zhbxu3cvxul6h4",
      "https://ipfs.io/ipfs/bafybeifpxcq2hhbzuy2ich3duh7cjk4zk4czjl6ufbpmxep247ugwzsny4",
      contentHash,
      metadataHash
    );
    const verified = await isMediaDataVerified(mediaData);
    if (!verified) {
      throw new Error("MediaData not valid, do not mint");
    }

    const bidShares = constructBidShares(
      10, // creator share
      90, // owner share
      0 // prevOwner share
    );
    const tx = await zora.mint(mediaData, bidShares);
    await tx.wait(8); // 8 confirmations to finalize
    minting = false;
    console.log(tx)
  }

  async function connect() {
    await window.ethereum.enable();
    provider = new Web3Provider(window.ethereum);
    provider.on("network", (newNetwork, oldNetwork) => {
        console.log({oldNetwork, newNetwork})
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
            window.location.reload();
        }
    });
    console.log(provider)
    
    // const signer = provider.getSigner();
  }
</script>

{#if provider}
  <button on:click={mint}>Mint!</button>
{:else}
  <button on:click={connect}>Connect your Wallet</button>
{/if}
