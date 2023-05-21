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
  if (message.body.toLowerCase().startsWith("halo")) {
    await client.sendMessage(
      message.from,
      `Selamat datang di warung kami\n\nKami menjual berbagai macam makanan.\nUntuk melihat menu, silahkan ketik 'Menu' pada pesan.\nTerima kasih\n\n*Selamat njajan*`
    );
  } else if (message.body.toLowerCase() == "menu") {
    client.sendMessage(
      message.from,
      `*Menu Makanan*\n\nNasi Goreng Rp12.000\nAyam Goreng Rp15.000\nBebek Goreng Rp20.000\nMartabak Mini Rp5.000\n\nUntuk melakukan pemesanan, silahkan ketik\n'Pesan#nama makanan,berapa porsi'\n\nContoh:\nPesan#Nasi goreng,2#Ayam goreng,1`
    );
  } else if (message.body.toLowerCase().startsWith("pesan")) {
    client.sendMessage(
      message.from,
      `Terima kasih telah melakukan pemesanan di warung kami.\nPesananmu sudah masuk dan akan kami proses secepatnya.\n\n*Selamat njajan*`
    );
  }
});

client.initialize();
