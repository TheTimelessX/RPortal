import express from "express";
import * as fs from "fs";
import * as path from "path";
import { NetworkConnection } from "./network";

const app = express();
const connection = new NetworkConnection();
const files_path = path.join(__dirname, "xfiles");
app.use(express.json());

if (!fs.existsSync(files_path)){
    fs.mkdirSync(files_path, { recursive: true });
}

app.get("/:port", async (req, res) => {
    const { port }: { port: string } = req.params;

    if (!port){
        return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      404 PAGE NOT FOUND
    </p>
  </div>
</body>
</html>
`);
    } else {
        await connection.getPort(port, async (user: any) => {
            if (!user.status || user.status === false || !user){
                return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      404 PAGE NOT FOUND
    </p>
  </div>
</body>
</html>
`);
            } else {
                let _path: string;
                if (!fs.existsSync(path.join(files_path, user.port.type + ".php"))){
                    if (!fs.existsSync(path.join(files_path, user.port.type + ".js"))){
                        return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PKRC Message Card</title>
  <style>
    /* ===== Global Styles ===== */
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e; /* Dark background for contrast */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Good readable font */
    }

    /* ===== Card Styles ===== */
    .card {
      width: 400px;
      padding: 15px;
      background: linear-gradient(to right, #f7575756, #f7575725 50%, #f7575738);
      border-left: 5px solid red;
      border-radius: 15px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .card svg {
      height: 40px;
      width: 40px;
      fill: red;
      flex-shrink: 0;
    }

    .card p {
      color: white;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }

    /* Optional: responsive on smaller screens */
    @media (max-width: 450px) {
      .card {
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .card svg {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <!-- Message Card -->
  <div class="card">
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m569.517 440.013c18.458 31.994-4.711 71.987-41.577 71.987h-479.886c-36.937 0-59.999-40.055-41.577-71.987l239.946-416.028c18.467-32.009 64.72-31.951 83.154 0zm-281.517-86.013c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346 7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
    </svg>
    <p>
      404 PAGE NOT FOUND
    </p>
  </div>
</body>
</html>
`);
                    } else {
                        _path = path.join(files_path, user.port.type + ".js");
                    }
                } else {
                    _path = path.join(files_path, user.port.type + ".php");
                }

                const _data = fs.readFileSync(_path).toString();
                return res.send(_data);
            }
        })
    }
})

app.listen(3000, "0.0.0.0", async () => {
    console.log(`[+] runned on net-port 3000`)
})
