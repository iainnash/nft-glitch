import { NFTStorage, Blob } from "nft.storage";
const token = process.env.NFT_STORE_KEY;
console.log(token);
const client = new NFTStorage({ token });

export async function ipfsHandlerSavePage(pageContent) {
    const r = await fetch('/api/ipfs2', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            data: pageContent,
            title: ".",
        })
    });
  const content = new Blob(['testing', pageContent]);
  const cid = await client.storeBlob(content);
  console.log(cid);
  alert(cid);
}
