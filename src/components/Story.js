// src/components/Story.js
import React from 'react';

const Story = ({ story, onClick }) => {
  return (
    <div className="story" onClick={onClick}>
      <img src={story.imageUrl} alt="Story" />
      {!story.viewed && <span className="new-story-indicator"></span>}
    </div>
  );
};

export default Story;
