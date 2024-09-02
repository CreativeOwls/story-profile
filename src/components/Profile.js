// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import Story from './Story';
import StoryViewer from './StoryViewer';

const Profile = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      imageUrl:
        'https://creativeowls.io/wp-content/uploads/2022/11/ReadyPlayerMe-Avatar-16.png',
      type: 'image',
      viewed: false,
      timestamp: new Date('2024-09-01T00:00:00'),
      caption: "My first story!",
    },
  ]);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [caption, setCaption] = useState("");

  // Automatically remove stories older than 24 hours
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const filteredStories = stories.filter(
        (story) => now - new Date(story.timestamp) < 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      );
      setStories(filteredStories);
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [stories]);

  const openStory = () => {
    setCurrentStoryIndex(0); // Start from the first story
  };

  const closeStoryViewer = () => {
    setCurrentStoryIndex(null);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith('video') ? 'video' : 'image';
      const reader = new FileReader();
      reader.onload = (e) => {
        const newStory = {
          id: stories.length + 1,
          imageUrl: e.target.result,
          type: fileType,
          viewed: false,
          timestamp: new Date(),
          caption: caption,
        };
        setStories([newStory, ...stories]);
        setCaption(""); // Clear the caption input after upload
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="stories">
        {stories.length > 0 && (
          <Story
            key="single-story"
            story={stories[0]}
            onClick={openStory}
          />
        )}
      </div>

      {/* Caption Input */}
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption..."
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="upload"
      />
      <label htmlFor="upload" className="upload-button">
        + Add Story
      </label>

      {currentStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={currentStoryIndex}
          onClose={closeStoryViewer}
        />
      )}
    </div>
  );
};

export default Profile;
