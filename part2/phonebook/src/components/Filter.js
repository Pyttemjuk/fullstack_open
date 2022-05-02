import React from "react";

const Filter = ({ showName, handleNameFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={showName} onChange={handleNameFilter}></input>
    </div>
  );
};

export default Filter;
