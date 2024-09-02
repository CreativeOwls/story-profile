// src/components/StoryViewer.js
import React, { useState, useEffect } from 'react';

const StoryViewer = ({ stories, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    setFadeClass('fade-in');
    const timeout = setTimeout(() => {
      if (index < stories.length - 1) {
        setFadeClass('fade-out');
        setTimeout(() => setIndex(index + 1), 500); // 500ms for fade-out effect
      } else {
        onClose();
      }
    }, 7000); // 7 seconds

    return () => clearTimeout(timeout);
  }, [index, stories.length, onClose]);

  const nextStory = () => {
    if (index < stories.length - 1) {
      setFadeClass('fade-out');
      setTimeout(() => setIndex(index + 1), 500);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (index > 0) {
      setFadeClass('fade-out');
      setTimeout(() => setIndex(index - 1), 500);
    }
  };

  const currentStory = stories[index];

  return (
    <div className="story-viewer">
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <div className={`story-image ${fadeClass}`}>
        {currentStory.type === 'image' ? (
          <img src={currentStory.imageUrl} alt="Story" />
        ) : (
          <video controls autoPlay>
            <source src={currentStory.imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {currentStory.caption && (
          <div className="story-caption">{currentStory.caption}</div>
        )}
        {/* Render Stickers */}
        {currentStory.stickers && currentStory.stickers.map((sticker, i) => (
          <img
            key={i}
            src={sticker.src}
            alt="sticker"
            className="story-sticker"
            style={{ top: sticker.y + '%', left: sticker.x + '%', position: 'absolute' }}
          />
        ))}
      </div>
      <div className="navigation-buttons">
        {index > 0 && <button className="prev-button" onClick={prevStory}>&larr;</button>}
        {index < stories.length - 1 && <button className="next-button" onClick={nextStory}>&rarr;</button>}
      </div>
    </div>
  );
};

export default StoryViewer;
