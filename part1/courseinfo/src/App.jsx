const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />

            <Content
                part1={part1} exercise1={exercises1}
                part2={part2} exercise2={exercises2}
                part3={part3} exercise3={exercises3}
            />

            <Total total={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}


const Header = (params) => {
    return (
        <div>
            <h1>{params.course}</h1>
        </div>
    )
}

const Part = (params) => {
    return (
        <p>{params.part} {params.exercise}</p>
    )
}

const Content = (params) => {
    return (
        <div>
            <Part part={params.part1} exercise={params.exercise1}/>
            <Part part={params.part2} exercise={params.exercise2}/>
            <Part part={params.part3} exercise={params.exercise3}/>
        </div>
    )
}

const Total = (params) => {
    return (
        <div>
            <p>Number of exercises {params.total}</p>
        </div>
    )
}

export default App
