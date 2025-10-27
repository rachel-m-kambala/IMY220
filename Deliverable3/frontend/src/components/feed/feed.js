//Mukaji Mweni Rachel Kambala u23559129 position-24

import React from "react";
import ProjectPreview from "../project/ProjectPreview";

const Feed = () => {
  const projects = [
    { id: 1, name: "DevChatBot", owner: "@CodeQueen88" },
    { id: 2, name: "PortfolioSite", owner: "@ElleJohnson" },
  ];

  return (
    <div>
      {projects.map((p) => (
        <ProjectPreview key={p.id} item={p} />
      ))}
    </div>
  );
};

export default Feed;
