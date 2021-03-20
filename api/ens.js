import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

module.exports = async (req, res) => {
  const {name} = req.body;
  return res.json({
      address: await provider.resolveName(name),
      name,
  });
};
