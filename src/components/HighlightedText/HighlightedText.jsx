// components/HighlightedTitle.jsx
import React from 'react';
import './HighlightedText.css';

export default function HighlightedTitle({ title, highlight }) {
  if (!title || !highlight) return <>{title}</>;

  const parts = title.split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="highlight">{part}</span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
}
