//Mukaji Mweni Rachel Kambala u23559129 24
import React from "react";

const SortDropdown = ({ sortBy, setSortBy }) => (
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="sort-dropdown"
  >
    <option value="date">Sort by Date</option>
    <option value="popularity">Sort by Popularity</option>
  </select>
);

export default SortDropdown;