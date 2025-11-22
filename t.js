const url = "http://127.0.0.1:3002/add-dargah";

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
