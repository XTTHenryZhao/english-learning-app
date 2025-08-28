import React from 'react';

const AuthorQR: React.FC = () => {
  const qrSrc = '/author-qr.png'; // 将二维码图片放在 public/author-qr.png

  return (
    <>
      <a className="author-qr left" href={qrSrc} target="_blank" rel="noreferrer" aria-label="作者二维码(左)">
        <img src={qrSrc} alt="作者二维码" />
        <span className="label">欢迎与作者交流联系</span>
      </a>
      <a className="author-qr right" href={qrSrc} target="_blank" rel="noreferrer" aria-label="作者二维码(右)">
        <img src={qrSrc} alt="作者二维码" />
        <span className="label">欢迎与作者交流联系</span>
      </a>
    </>
  );
};

export default AuthorQR;
