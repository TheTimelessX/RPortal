// const tron = require("./tron");
// const t = require("tronweb");

// tron.getTransactionByHash("584b0f89c51faf4d235b8728a9b265b29939aa5e80f771c35b864c407c1f672d").then(async (x) => {
//     const time = x.tx.raw_data.timestamp;
//     console.log(new Date(time))
//     console.log(t.TronWeb.fromSun(x.tx.raw_data.contract[0].parameter.value.amount));
// })

// const Database = require("better-sqlite3");

// const db = new Database("x.db");

// db.exec("CREATE TABLE IF NOT EXISTS x (id INT PRIMARY KEY)")

const x = require("./database");
const u = new x.UserDatabase();

// u.getUserByPort("Gp+evhS", async (user) => {
//     console.log(user)
// })

// setInterval(async () => {
//     console.clear();
//     await u.getUsers(async (y) => {
//         for (const user of y){
//             console.log(user)
//         }
//     })
// }, 1000)

// u.removeContainer("KPAYZzi", "b2f2157e", async (t) => {console.log(t)})

// u.getDomains(async (dom) => {
//     console.log(dom);
// })

const url = "http://127.0.0.1:3000/get-port-info";

async function sendRequest() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        port: "jSmUpkf",
        skin: "s.html",
        domain: "http://127.0.0.1:3002"
      })
    });

    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);

  } catch (err) {
    console.error("Error:", err);
  }
}

sendRequest();
