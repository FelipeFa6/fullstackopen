import { useState, useEffect } from 'react'

import personService from './services/Persons'

const App = () => {


    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    const [popup, setPopup] = useState({ })

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        const newPerson = {
            name: newName,
            phone: newPhone
        }

        if (existingPerson) {
            if (existingPerson.phone === newPhone){
                alert(`${newName} already registered`);
                return;
            }
            if (window.confirm( `${newName} exists. Do you want to update the phone number?`)) {
                personService
                    .update(existingPerson.id, newPerson)
                    .then(response => {
                        const updatedPersons = persons.map(person =>
                            person.id === existingPerson.id ? response.data : person
                        );
                        setPersons(updatedPersons);
                    })
                setNewName('');
                setNewPhone('');
                displayPopup(`${newName} was updated.`)
            }
            return;
        }
        
        personService
            .create(newPerson)
            .then(response => {
                setPersons(copy => [...copy, response.data])
                displayPopup(`${newName} was added.`)
            })
            .catch(e => displayPopup(e.response.data.error, 'red'))
            .finally(() => {
                setNewName('');
                setNewPhone('');
            })
    }

    const displayPopup = (message, color='green') => {
        const seconds = 3;

        setPopup({message, color});

        setTimeout(() => {
            setPopup({});
        }, seconds * 1000);
    };


    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    const fetchPersons = () => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }

    const handleDelete = (personID) => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        personService
            .remove(personID)
            .then(() => {
                const updatedPersons = persons.filter(person => person.id !== personID);
                setPersons(updatedPersons);
            })
            .catch(error => displayPopup(error.message, 'red'))
    }

    useEffect(fetchPersons, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification popup={popup} />
            <Filter handler={handleFilterChange} text={filter} />
            <h2>add new</h2>
            <PersonForm
                nameHandler  = {handleNameChange}
                phoneHandler = {handlePhoneChange}
                addPerson    = {addPerson}
                newName      = {newName}
                newPhone     = {newPhone}
            />

            <h2>Numbers</h2>
            <Persons handleDelete={handleDelete} persons={filteredPersons} />
        </div>
  )
}

export default App

const Notification = ({ popup }) => {
    const style = {
        color: popup.color,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    };

    if (!popup.message) {
        return null;
    }

    return (
        <div style={style}>
            {popup.message}
        </div>
    );
};


const Filter = ({ handler, text }) => {
    return (
        <div>
            Filter: <input onChange={handler} value={text} />
        </div>
    );
};

const PersonForm = ({ nameHandler, phoneHandler, addPerson, newName, newPhone }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input onChange={nameHandler} value={newName} />
            </div>

            <div>
                Phone: <input onChange={phoneHandler} value={newPhone} />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

const Persons = ({ handleDelete, persons }) => {
    return (
        <div>
            {persons.map((person, index) => (
                <div key={index}>
                    - {person.name} {person.phone} <button onClick={() => handleDelete(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
