import React from 'react';

export default function AlertDialog({ content, button1, button2 }) {
  return (
    <div className="alertBox">
      <div className="content">{content}</div>
      <button>{button1}</button>
      <button>{button2}</button>
    </div>
  );
}
