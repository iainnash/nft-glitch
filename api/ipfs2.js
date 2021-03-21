const {NFTStorage, Blob } = require("nft.storage");
const token = process.env.NFT_STORE_KEY;
const client = new NFTStorage({ token });

async function ipfsHandlerSavePage(pageContent) {
  const content = new Blob([pageContent]);
  const cid = await client.storeBlob(content);
  return cid;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.send('');
    return;
  }
  console.log('TOKEN', token);
    const { data, name } = req.body;
    if (!data || !name) {
      return res.json({
        success: false,
        error: "missing fields",
      });
    }
  
    console.log('has data len', data.length);
    const r = await ipfsHandlerSavePage(data);
    return res.json({
      success: true,
      cid: r,
    });
  };

