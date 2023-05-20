const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
});

//Menampilkan QR Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//Login berhasil
client.on("ready", () => {
  console.log("Berhasil Login!");
});

//Membalas pesan masuk
client.on("message", async (message) => {
  if (message.body != null) {
    await client.sendMessage(
      message.from,
      `Selamat datang di toko kami.\n\nIni adalah *Bot Whatsapp Sederhana*`
    );
  }
});

client.initialize();
