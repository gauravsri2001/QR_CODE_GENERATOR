

import './App.css';
import QRCode from 'react-qr-code';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [value, setValue] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (qrVisible && qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then(canvas => {
        const dataUrl = canvas.toDataURL();
        setQrVisible(false);
        setValue(dataUrl);
      });
    }
  }, [qrVisible]);

  const generateQRCode = () => {
    if (!value) {
      return;
    }
    setQrVisible(true);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = value;
    link.click();
  };

  return (
    <div className="container">
      <h1>QR Code Generat</h1>

      <textarea
        value={value}
        placeholder="Enter the details here..."
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrVisible && (
        <div className="qr-code-container" ref={qrCodeRef}>
          <QRCode value={value} size={200} />
        </div>
      )}

      {value && (
        <>
          <img src={value} alt="QR code" />
          <button onClick={downloadQRCode}>Download</button>
        </>
      )}
    </div>
  );
}

export default App;


