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
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const notify = (message, type) => {
    setNotification(message);
    setType(type);
    setTimeout(() => setNotification(null), 5000);
  };

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null;
    }

    return <div className={className}>{message}</div>;
  };

  const addButton = (event) => {
    event.preventDefault();

    setNewName("");
    setNewNumber("");

    const person = {
      name: newName,
      number: newNumber,
    };

    const foundPerson = persons.find((p) => p.name === newName);
    if (foundPerson) {
      const ok = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace old number with a new one?`
      );

      if (ok) {
        personService
          .update(foundPerson.id, { ...foundPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== foundPerson.id ? p : updatedPerson))
            );
            notify(`Changed number for ${updatedPerson.name}`, "info");
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            if (error.name === "TypeError") {
              notify(
                `${foundPerson.name} has already been removed from server`,
                "error"
              );
              setPersons(persons.filter((p) => p.id !== foundPerson.id));
            } else {
              notify(error.response.data.error, "error");
            }
          });
      }
    } else {
      personService
        .create(person)
        .then((createdPerson) => setPersons(persons.concat(createdPerson)))
        .catch((error) => {
          notify(error.response.data.error, "error");
        });

      notify(`Added ${person.name}`, "info");
    }
  };

  const removePersonWith = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id);
      setPersons(persons.filter((p) => p.id !== id));
      notify(`Deleted ${person.name}`, "info");
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
      <Notification message={notification} className={type}></Notification>
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
