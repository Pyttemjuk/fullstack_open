import React from "react";

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <p style={{ fontWeight: "bold" }}>total of {sum} exercises </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, curr) => {
    return (sum += curr.exercises);
  }, 0);

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={total}></Total>
    </>
  );
};

export default Course;
