//Mukaji Mweni Rachel Kambala u23559129 position-24
import React from "react";

const ProjectPreview = ({ item }) => (
  <div>
    <h3>{item.name}</h3>
    <p>Owner: {item.owner}</p>
  </div>
);

export default ProjectPreview;
