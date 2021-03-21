const fs = require("fs");
const axios = require('axios')
const NodeFormData = require("form-data");

const api_key = process.env.PINATA_API_KEY;
const api_secret = process.env.PINATA_API_SECRET;

module.exports = async (req, res) => {
  const { data, name, author } = req.body;
  if (!data || !name) {
    return res.json({
      success: false,
      error: "missing fields",
    });
  }

  const form = new NodeFormData();

  form.append("file", data);

  const request = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
    withCredentials: true,
    headers: {
      pinata_api_key: api_key,
      pinata_secret_api_key: api_secret,
      'content-type': `multipart/form-data; boundary=${data._boundary}`,
      // ...form.getHeaders(),
    },
  });
  if (request.status !== 200) {
    // throw new Error(`unknown server response ${result}`);
    return res.json({
      success: false,
      request,
    })
  }
  return res.json({success: true, data: request.data});

  const fileData = req.body.data;
  const readable = Readable.from(fileData);
  await fs.promises.writeFile("./page.html", fileData);
  const pin = await pinata.pinFileToIPFS(fs.createReadStream("./page.html"), {
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
