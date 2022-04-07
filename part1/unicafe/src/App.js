import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}></StatisticsLine>
          <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
          <StatisticsLine text="bad" value={bad}></StatisticsLine>
          <StatisticsLine text="all" value={all}></StatisticsLine>
          <StatisticsLine
            text="average"
            value={((good - bad) / all).toFixed(1)}
          ></StatisticsLine>
          <StatisticsLine
            text="positive"
            value={((good / all) * 100).toFixed(1) + " %"}
          ></StatisticsLine>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);

  const handleGoodClick = () => {
    setAll(allClicks + 1);
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setAll(allClicks + 1);
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setAll(allClicks + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading text="give feedback"></Heading>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={allClicks}
      ></Statistics>
    </div>
  );
};

export default App;
