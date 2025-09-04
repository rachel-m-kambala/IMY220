//Mukaji Mweni Rachel Kambala u23559129 24
import React from "react";
import ProjectCard from "./ProjectCard";

export default function Feed({ activities }) {
  return (
    <div className="feed">
      {activities.map((activity) => (
        <ProjectCard key={activity.id} data={activity} />
      ))}
    </div>
  );
}
