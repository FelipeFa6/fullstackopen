const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts}/>
            <Total parts={parts}/>
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
        <p>{params.part.name} {params.part.exercises}</p>
    )
}

const Content = (params) => {
    return (
        <div>
            <Part part={params.parts[0]}/>
            <Part part={params.parts[1]}/>
            <Part part={params.parts[2]}/>
        </div>
    )
}

const Total = (params) => {
    const part1 = params.parts[0].exercises;
    const part2 = params.parts[1].exercises;
    const part3 = params.parts[2].exercises;

    const total = part1 + part2 + part3;

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

export default App
