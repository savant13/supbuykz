import React from 'react';

const DownloadPDFButton = (props) => {
  const handleDownloadClick = () => {
    const url = '/home/multibala/Desktop/111/supbuy/frontend/src/data/Образец_договора_поставки_товара_заключаемого_между_юридическими.docx';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownloadClick}>
      {props.text}
    </button>
  );
}

export default DownloadPDFButton;
