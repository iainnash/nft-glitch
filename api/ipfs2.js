const {NFTStorage, Blob } = require("nft.storage");
const token = process.env.NFT_STORE_KEY;
const client = new NFTStorage({ token });

export async function ipfsHandlerSavePage(pageContent) {
  const content = new Blob([pageContent]);
  const cid = await client.storeBlob(content);
  return cid;
}

module.exports = async (req, res) => {
    const { data, name } = req.body;
    if (!data || !name) {
      return res.json({
        success: false,
        error: "missing fields",
      });
    }
  
    const r = await ipfsHandlerSavePage(data);
    return res.json({
      success: true,
      cid: r,
    });
  };

