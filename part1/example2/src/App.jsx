import { useState } from 'react';

const App = () => {

    const [ clicks, setClick ]  = useState({ left: 0, right: 0 });
    const [ allClicks, setAll ] = useState([])
    const [ total, setTotal ]   = useState(0)

    const handleLeftClick = () => {
        const updatedLeft = clicks.left + 1;
        setClick({ ...clicks, left: updatedLeft})
        setAll(allClicks.concat('L'))
        setTotal(updatedLeft + clicks.right)
    }

    const handleRightClick = () => {
        const updatedRight = clicks.right + 1;
        setClick({ ...clicks, right: updatedRight })
        setAll(allClicks.concat('R'))
        setTotal(clicks.left + updatedRight)
    }

    return (
        <div>
            {clicks.left}
            <Button handleClick={handleLeftClick} text='left' />
            <Button handleClick={handleRightClick} text='right' />
            {clicks.right}
            <History allClicks={allClicks} />
        </div>

    )
}

export default App

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
            the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
        button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

