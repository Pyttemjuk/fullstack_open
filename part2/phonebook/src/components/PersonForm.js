import React from "react";

const PersonForm = ({
  addButton,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addButton}>
      <div>
        <div>
          name: <input value={newName} onChange={handleNameChange}></input>
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
