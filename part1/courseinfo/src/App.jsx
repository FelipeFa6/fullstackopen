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

            <Content >
                <p> {part1} {exercises1} </p>
                <p> {part2} {exercises2} </p>
                <p> {part3} {exercises3} </p>
            </Content>

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

const Content = (params) => {
    return (
        <div>
            {params.children}
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
