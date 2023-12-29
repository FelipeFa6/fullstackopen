const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

export default Course;

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
        {
            props.course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )
        }
        </div>
    )
}

const Total = (props) => {
    const total = props.course.parts.reduce((total, item) => total + item.exercises, 0);

    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}
