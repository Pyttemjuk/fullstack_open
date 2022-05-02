import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showName, setShowName] = useState("");
  const [addMessage, setAddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null;
    }

    return <div className={className}>{message}</div>;
  };

  const addButton = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);
    const message = `${newName} is already added to phonebook, replace old number with a new one?`;

    if (!found) {
      addPerson();
    } else if (window.confirm(message)) {
      updatePerson(found);
    }

    setTimeout(() => {
      setAddMessage(null);
      setErrorMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(personObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    setAddMessage(`Added ${personObject.name}`);
  };

  const updatePerson = (person) => {
    const changedPerson = { ...person, number: newNumber };
    personService
      .update(person.id, changedPerson)
      .then((changedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : changedPerson))
        );
        setAddMessage(`Changed number for ${changedPerson.name}`);
      })
      .catch((error) => {
        setErrorMessage(
          `Information about ${person.name} has already been removed from server`
        );
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const removePersonWith = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  const filtered = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(showName.toLocaleLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilter = (event) => {
    setShowName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} className="add"></Notification>
      <Notification message={errorMessage} className="error"></Notification>
      <Filter showName={showName} handleNameFilter={handleNameFilter}></Filter>
      <h2>Add new person</h2>
      <PersonForm
        addButton={addButton}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      {filtered.map((person) => (
        <Person
          key={person.id}
          person={person}
          removePerson={() => removePersonWith(person.id)}
        ></Person>
      ))}
    </div>
  );
};

export default App;
