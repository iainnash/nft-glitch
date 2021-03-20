import { NFTStorage, Blob } from "nft.storage";
const token = process.env.NFT_STORE_KEY;
console.log(token);
const client = new NFTStorage({ token });


async function ipfsHandlerSavePage(pageContent) {
  const content = new Blob(pageContent]);
  const cid = await client.storeBlob(content);
  return cid;
}

module.exports = async (req, res) => {
    const { data, name, author } = req.body;
    if (!data || !name) {
      return res.json({
        success: false,
        error: "missing fields",
      });
    }
  
    const r = await ipfsHandlerSavePage('testing');
    return res.json({
      success: true,
      cid: r,
    });
  };

