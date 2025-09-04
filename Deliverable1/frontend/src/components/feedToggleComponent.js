//Mukaji Mweni Rachel Kambala u23559129 24
import React from 'react';

const FeedToggle = ({ feedType, setFeedType }) => (
  <div className="feed-toggle">
    <button
      className={`toggle-button ${feedType === "local" ? "active" : ""}`}
      onClick={() => setFeedType("local")}
    >
      Local Feed
    </button>
    <button
      className={`toggle-button ${feedType === "global" ? "active" : ""}`}
      onClick={() => setFeedType("global")}
    >
      Global Feed
    </button>
  </div>
);

export default FeedToggle;