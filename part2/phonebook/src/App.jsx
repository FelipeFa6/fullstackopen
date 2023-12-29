import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        {
            name: 'Arto ellas',
            phone: '+569' }
    ]) 

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName && person.phone === newPhone)) {
            alert(`${newName} already in phonebook`);
            return;
        }

        const newPerson = {
            name: newName,
            phone: newPhone
        }

        setPersons(copy => [...copy, newPerson])
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>

                <div>
                    number: <input onChange={handlePhoneChange} value={newPhone} />
                </div>

                <div>
                    <button type="submit"> add</button>
                </div>
            </form>
            
            <div>debug: {newName} {newPhone}</div>
            <h2>Numbers</h2>
            { persons.map((person, index) => (
                <div key={index}>
                    - {person.name} {person.phone}
                </div>
            ))
            }
        </div>
  )
}

export default App
