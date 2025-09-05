//Mukaji Mweni Rachel Kambala u23559129 24
import React, { useState } from "react";
import Sidebar from "../components/sidebarComponent";
import SearchBar from "../components/searchbarComponent";
import FeedToggle from "../components/feedToggleComponent";
import SortDropdown from "../components/dropdownComponent";
import Feed from "../components/feedComponent";
import ActivitySidebar from "../components/activitySidebarComponent";
import "../css/homePage.css";

// Dummy feed data
const dummyActivities = [
  {
    id: 1,
    projectName: "Project Alpha",
    projectImage: "https://via.placeholder.com/200x100",
    user: "@devJane",
    time: "5 minutes ago",
    description: "Updated README and pushed changes.",
    status: "Checked in",
    downloads: 12,
    collaborators: ["@john", "@alice", "@mark"],
  },
  {
    id: 2,
    projectName: "Project Beta",
    projectImage: "https://via.placeholder.com/200x100",
    user: "@devJohn",
    time: "3 hours ago",
    description: "Fixed bug in authentication module.",
    status: "Checked out",
    downloads: 34,
    collaborators: ["@jane", "@mike", "@susan"],
  },
  {
    id: 3,
    projectName: "Project Gamma",
    projectImage: "https://via.placeholder.com/200x100",
    user: "@devAlice",
    time: "1 day ago",
    description: "Added dark mode support.",
    status: "Checked out",
    downloads: 20,
    collaborators: ["@john", "@emma"],
  },
];

 function Home() {
  const [feedType, setFeedType] = useState("local");
  const [sortBy, setSortBy] = useState("date");

  // Sorting logic
  const sortedFeed = [...dummyActivities].sort((a, b) => {
    if (sortBy === "date") return a.id < b.id ? 1 : -1;
    if (sortBy === "popularity") return b.downloads - a.downloads;
    return 0;
  });

  return (
    <div className="homepage">
      <Sidebar />
      <main className="main-content">
        <header className="top-bar">
          <SearchBar />
          <FeedToggle feedType={feedType} setFeedType={setFeedType} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </header>
        <div className="content-area">
          <Feed activities={sortedFeed} />
          <ActivitySidebar />
        </div>
      </main>
    </div>
  );
}
export default Home;