const QRCode = require('qrcode');
const os = require('os');

// Get local network IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const networkInterface of interfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
  
  return 'localhost';
}

async function generateQR() {
  const localIP = getLocalIP();
  const url = `http://${localIP}:3000`;
  
  console.log('\n🚀 OpenManus Frontend Development Server');
  console.log('==========================================');
  console.log(`📱 Local Network URL: ${url}`);
  console.log('\n📱 Scan this QR code with your Samsung S21:');
  console.log('==========================================\n');
  
  try {
    // Generate QR code in terminal
    const qrString = await QRCode.toString(url, {
      type: 'terminal',
      small: true
    });
    
    console.log(qrString);
    
    // Also generate a more detailed QR code
    const qrDetailed = await QRCode.toString(url, {
      type: 'terminal',
      small: false
    });
    
    console.log('\n📱 Detailed QR Code:');
    console.log('===================\n');
    console.log(qrDetailed);
    
    console.log('\n📋 Instructions for Samsung S21:');
    console.log('================================');
    console.log('1. Make sure your phone is on the same WiFi network');
    console.log('2. Open your camera app or QR scanner');
    console.log('3. Point at the QR code above');
    console.log('4. Tap the notification to open in browser');
    console.log('\n💡 Alternative: Manually enter this URL in your phone browser:');
    console.log(`   ${url}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Ensure both devices are on same network');
    console.log('- Check if firewall is blocking port 3000');
    console.log('- Try disabling Windows Defender firewall temporarily');
    
  } catch (error) {
    console.error('Error generating QR code:', error);
    console.log(`\n📱 Manual URL for your Samsung S21: ${url}`);
  }
}

generateQR();