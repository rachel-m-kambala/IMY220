//Mukaji Mweni Rachel Kambala u23559129 24
import React from "react";

function ProjectCard({ data }) {
  return (
    <div className="project-card">
      <h3>{data.projectName}</h3>
      <img src={data.projectImage} alt="Project" />
      <p><strong>{data.user}</strong></p>
      <p>{data.time}</p>
      <p>{data.description}</p>
      <p>{data.status}</p>
      <p>Downloads: {data.downloads}</p>
      <p>Collaborators: {data.collaborators.join(", ")}</p>
    </div>
  );
}
export default ProjectCard;