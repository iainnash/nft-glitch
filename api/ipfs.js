import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

module.exports = async (req, res) => {
  const { data, name, author } = req.body;
  if (!data || !name) {
    return res.json({
      success: false,
      error: "missing fields",
    });
  }

  const fileData = req.body.data;
  const readable = Readable.from(fileData);
  const pin = await pinata.pinFileToIPFS(readable, {
    pinataMetadata: {
      name: name,
      author: author,
    },
  });
  return res.json({
    success: true,
    pin,
    fileData,
  });
};
