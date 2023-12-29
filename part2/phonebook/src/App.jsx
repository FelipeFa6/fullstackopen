import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const [filter, setFilter] = useState('')

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

        if (persons.some(person => person.name === newName && person.phone === newPhone)) {
            alert(`${newName} ${newPhone} already registered`);
            return;
        }

        const newPerson = {
            name: newName,
            phone: newPhone
        }

        setPersons(copy => [...copy, newPerson])
        setNewName('');
        setNewPhone('');
    }

    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>

                <div>
                    filter: <input onChange={handleFilterChange} value={filter} />
                </div>

            <h2>add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>

                <div>
                    phone: <input onChange={handlePhoneChange} value={newPhone} />
                </div>

                <div>
                    <button type="submit"> add</button>
                </div>
            </form>
            
            <div>debug: {newName} {newPhone}</div>
            <h2>Numbers</h2>
            { filteredPersons.map((person, index) => (
                <div key={index}>
                    - {person.name} {person.phone}
                </div>
            ))
            }
        </div>
  )
}

export default App
