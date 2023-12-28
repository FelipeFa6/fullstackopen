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
    const total    = props.good + props.neutral + props.bad
    const average  = (props.good - props.bad ) / total
    const positive = props.good / total * 100

	return (
		<>
			<h1>statistics</h1>
            { total != 0 ? (
            <table>
                <tbody>
                    <StatisticLine text="good" value={props.good}/>
                    <StatisticLine text="neutral" value={props.neutral}/>
                    <StatisticLine text="bad" value={props.bad}/>
                    <StatisticLine text="all" value={total}/>
                    <StatisticLine text="average" value={average}/>
                    <StatisticLine text="positive" value={positive + ' %'}/>
                </tbody>
            </table>
            )
                : <p>No feedback given</p>
            }
		</>
	)
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>

    )
}
