import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto ellas' }
    ]) 

    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault()
        setPersons(copy => [...copy, {name: newName}])
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>

                <div>
                    <button type="submit"> add</button>
                </div>
            </form>
            
            <div>debug: {newName}</div>
            <h2>Numbers</h2>
            { persons.map((person, index) => (
                <div key={index}>
                    - {person.name}
                </div>
            ))
            }
        </div>
  )
}

export default App
