const {
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified,
} = require("@zoralabs/zdk");
require('isomorphic-fetch');
const {NFTStorage, Blob } = require("nft.storage");
const token = process.env.NFT_STORE_KEY;
const client = new NFTStorage({ token });

async function ipfsHandlerSavePage(pageContent) {
  const content = new Blob([pageContent]);
  const cid = await client.storeBlob(content);
  return cid;
}


module.exports = async (req, res) => {
  const { description, name, htmlHash } = req.body;

  const pageRequest = await fetch(`https://ipfs.io/ipfs/${htmlHash}`);
  const page = await pageRequest.text();

  const metadataJSON = generateMetadata("zora-20210101", {
    description: [description, `View gallery: https://ipfs.io/ipfs/${htmlHash}`].join("\n"),
    mimeType: "text/html",
    name,
    version: "zora-20210101",
  });

  const metadataCid = await ipfsHandlerSavePage(metadataJSON);

  const contentHash = sha256FromBuffer(Buffer.from(page));
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
  const mediaData = constructMediaData(
    `https://ipfs.io/ipfs/${htmlHash}`,
    `https://ipfs.io/ipfs/${metadataCid}`,
    contentHash,
    metadataHash
  );
  console.log('making media', mediaData);

  let isVerified = false;
  try {
    isVerified = await isMediaDataVerified(mediaData, 200);
  } catch (e) {
    console.error(e);
    // return res.json({
    //   success: false,
    //   error: 'bad verify'
    // })
  }

  return res.json({
    success: true,
    mediaData,
    metadataCid,
    metadataJSON,
    isVerified,
  });
};
