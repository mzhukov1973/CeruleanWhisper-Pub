function updateQR()  { qrCode.clear();      qrCode.makeCode('String to encode...');        }
function updateQR2() { this.qrCode.clear(); this.qrCode.makeCode(qrData.generateQRText()); }
