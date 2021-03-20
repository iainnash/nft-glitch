const {
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified,
} = require("@zoralabs/zdk");
const { ipfsHandlerSavePage } = require("./ipfs2");

module.exports = async (req, res) => {
  const { description, name, htmlHash } = req.body;

  const page = await fetch(`https://ipfs.io/ipfs/${htmlHash}`);

  const metadataJSON = generateMetadata("zora-20210101", {
    description,
    mimeType: "text/html",
    name,
    version: "zora-20210101",
  });

  const metadataHash = ipfsHandlerSavePage(metadataJSON);

  const contentHash = sha256FromBuffer(page.arrayBuffer());
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
  const mediaData = constructMediaData(
    `https://ipfs.io/ipfs/${htmlHash}`,
    `https://ipfs.io/ipfs/${metadataHash}`,
    contentHash,
    metadataHash
  );

  const isVerified = isMediaDataVerified(mediaData);

  return res.json({
    mediaData,
    isVerified,
  });
};
