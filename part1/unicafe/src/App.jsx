import { useState } from 'react'

const App = () => {
	const [good, setGood]       = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad]         = useState(0)

	const handleGood = () => {
		setGood(good + 1);
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1);
	}

	const handleBad = () => {
		setBad(bad + 1);
	}

	return (
    <div>
		<h1>give feedback</h1>
		<Button handleClick = {handleGood} text="Good"/>
		<Button handleClick = {handleNeutral} text="Neutral"/>
		<Button handleClick = {handleBad} text="Bad"/>
		
		<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App


const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	)
}

const Statistics = (props) => {
	return (
		<div>
			<h1>statistics</h1>
			<p>Good {props.good}</p>
			<p>Neutral {props.neutral}</p>
			<p>Bad {props.bad}</p>
		</div>
	)
}
