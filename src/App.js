import { useState } from "react";

export default function App() {
  return (
    <>
      <Counter />
    </>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function getModifiedDate(addDays = 0, addMonths = 0) {
    const today = new Date();

    today.setMonth(today.getMonth() + addMonths);
    today.setDate(today.getDate() + addDays);

    const dateParts = new Intl.DateTimeFormat("en", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).formatToParts(today);

    // array to object
    const formattedDateObj = dateParts.reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

    return formattedDateObj;
  }

  const modifiedDate = getModifiedDate(count);
  let { weekday, day, month, year } = modifiedDate;

  return (
    <>
      <div>
        <input
          className="input-range"
          type="range"
          min={0}
          max={10}
          onChange={(e) => setStep(Number(e.target.value))}
          value={step}
        />
        <span>{step}</span>
      </div>
      {/* <div>

        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span className="nameCount">Step : {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div> */}
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="number"
          className="nameCount"
          onChange={(e) => setCount(Number(e.target.value))}
          value={count}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <h2>
        {Math.abs(count)} days {count >= 0 ? "from" : "ago"} today {weekday}{" "}
        {month} {day} {year}
      </h2>
      <div>
        <button
          className={count !== 0 || step !== 1 ? "rest active-rest" : "rest"}
          onClick={() => {
            setCount(0);
            setStep(1);
          }}
        >
          Rest
        </button>
      </div>
    </>
  );
}
