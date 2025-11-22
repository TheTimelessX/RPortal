const x = require("./network");
const n = new x.NetworkConnection();

n.sendInfo("QjdETTW", "s", async (t) => {
    console.log(t)
}, { "name": "علی ممدی", "phone_number": "+988888888", "card": "xxxxxx", "cvv2": "4334" })

