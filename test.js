const tron = require("./tron");
const t = require("tronweb");

tron.getTransactionByHash("584b0f89c51faf4d235b8728a9b265b29939aa5e80f771c35b864c407c1f672d").then(async (x) => {
    const time = x.tx.raw_data.timestamp;
    console.log(new Date(time))
    console.log(t.TronWeb.fromSun(x.tx.raw_data.contract[0].parameter.value.amount));
})