//Mukaji Mweni Rachel Kambala u23559129 24
import React from "react";

const dummyDashboard = {
  changes: [
    { id: 1, text: "@devJane committed new code to Project Alpha" },
    { id: 2, text: "@devJohn merged pull request in Project Beta" },
  ],
  comments: [
    { id: 1, text: "@devAlice commented: 'Great work on the UI!'" },
    { id: 2, text: "@devMark commented: 'Can we optimize this function?'" },
  ],
  forks: [
    { id: 1, text: "Project Gamma was forked by @devSusan" },
    { id: 2, text: "Project Alpha received a star from @devMike" },
  ],
  invitations: [
    { id: 1, text: "@devEmma invited you to collaborate on Project Delta" },
  ],
};

function ActivitySidebar() {
  return (
    <aside className="activity-sidebar">
      <h3>Activity Dashboard</h3>

      <div>
        <h4>Recent Changes</h4>
        <ul>
          {dummyDashboard.changes.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Comments</h4>
        <ul>
          {dummyDashboard.comments.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Forks & Stars</h4>
        <ul>
          {dummyDashboard.forks.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Invitations</h4>
        <ul>
          {dummyDashboard.invitations.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
export default ActivitySidebar;