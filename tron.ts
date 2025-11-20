import * as TronWeb from "tronweb";

const fullNode = "https://api.trongrid.io";
const solidityNode = "https://api.trongrid.io";

export const tronWeb = new TronWeb.TronWeb({
  fullHost: fullNode,
  solidityNode
});

export async function getTransactionByHash(txHash: string) {
  try {
    const tx = await tronWeb.trx.getTransaction(txHash);
    return { tx };
  } catch (err) {
    throw err;
  }
}