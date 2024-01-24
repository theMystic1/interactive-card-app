import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

function Main() {
  return (
    <main className="main">
      <LeftMain />
      <RightMain />
    </main>
  );
}

function LeftMain() {
  return <div className="left-main"></div>;
}

function Oval({ background, className }) {
  return (
    <span className={className} style={{ backgroundColor: background }}></span>
  );
}

function FrontCard({ inputMonth, inputYear, inputName, inputNumber }) {
  return (
    <div className="front-card">
      <Oval className="oval-container oval-1" background="#D53AFF" />
      <Oval className="oval-container oval-2" background="#ff834a" />
      <Oval className="oval-container oval-3" background="#47A2FF" />

      <img src="./img.svg" alt="img" />

      <p className="card-num">
        {!inputNumber ? "0000 0000 0000 000" : inputNumber}
      </p>

      <span className="card-name-cvc">
        <p className="name">{!inputName ? "JOHN DOE" : inputName}</p>

        <p className="card-cvc">
          {!inputMonth ? "00" : inputMonth}/{!inputYear ? "00" : inputYear}
        </p>
      </span>
    </div>
  );
}

function BackCard({ inputCVC, isConfirmed }) {
  return (
    <div className="back-card">
      <div className="black"></div>
      <div className="gray">
        <p className="cvc">{!inputCVC ? "000" : inputCVC}</p>
      </div>
      {isConfirmed && <img src="./back.svg" alt="back" />}
    </div>
  );
}

function ErrorMsg({ children, className }) {
  return <p className={className}>{children}</p>;
}

function Input({
  children,
  placeholder,
  className,
  value,
  onChange,
  onKeyDown,
  isSubmitted,
  isValid,
}) {
  return (
    <div className={className}>
      <label>{children}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={
          isSubmitted ? (isValid ? "correct" : "wrong-input") : "correct"
        }
      />
    </div>
  );
}

function InputDOB({
  value,
  value1,
  onChange,
  onChange1,
  value2,
  onChange2,
  onCorrect,
  onCorrect2,
  onCorrect3,
  isSubmitted,
}) {
  return (
    <div className="card-DOB">
      <div>
        <span>
          <label>Exp. date (mm/yy)</label>
          <input
            type="text"
            placeholder="MM"
            value={value}
            onChange={onChange}
            className={
              isSubmitted ? (onCorrect ? "correct" : "wrong-input") : "correct"
            }
          />

          <input
            type="text"
            placeholder="YY"
            value={value1}
            onChange={onChange1}
            className={
              isSubmitted ? (onCorrect2 ? "correct" : "wrong-input") : "correct"
            }
          />
          {/* {isSubmitted
          ? !onCorrect2 && <ErrorMsg className="err">Can't be blank</ErrorMsg>
        : ""} */}
        </span>

        <span className="span">
          <label>cvc</label>
          <input
            type="text"
            placeholder="e.g 123"
            value={value2}
            onChange={onChange2}
            className={
              isSubmitted ? (onCorrect3 ? "correct" : "wrong-input") : "correct"
            }
          />
        </span>
      </div>
      {isSubmitted
        ? !onCorrect3 && <ErrorMsg className="err">Can't be blank</ErrorMsg>
        : ""}
    </div>
  );
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

function Form({
  inputCVC,
  inputName,
  inputNumber,
  inputMonth,
  inputYear,
  handleInpCVC,
  handleInpMonth,
  handleInpName,
  handleKeyDown,
  handleInpYear,
  handleInputNum,
  isConfirmed,
  setIsConfirmed,
  validName,
  validNum,
  validMonth,
  validYear,
  validCVC,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (validName && validNum && validMonth && validYear && validCVC) {
      setIsConfirmed((conf) => !conf);
    } else {
      return false;
    }
  };

  return (
    <form className="card-details " onSubmit={handleSubmit}>
      {!isConfirmed && (
        <>
          <Input
            className="card-name"
            placeholder="e.g Jane Appeased"
            value={inputName}
            onChange={handleInpName}
            onKeyDown={handleKeyDown}
            isSubmitted={isSubmitted}
            isValid={validName}
          >
            Card holder's name
          </Input>

          <Input
            className="card-number"
            placeholder="e.g 1234 5678 9123 0000"
            value={inputNumber}
            onChange={handleInputNum}
            onKeyDown={handleKeyDown}
            isSubmitted={isSubmitted}
            isValid={validNum}
          >
            Card Number
          </Input>
          {isSubmitted
            ? !validNum && (
                <ErrorMsg className={"err err-num "}>
                  Wrong Format, Numbers only
                </ErrorMsg>
              )
            : ""}

          <InputDOB
            value={inputMonth}
            onChange={handleInpMonth}
            value1={inputYear}
            onChange1={handleInpYear}
            value2={inputCVC}
            onChange2={handleInpCVC}
            onCorrect={validMonth}
            onCorrect2={validYear}
            onCorrect3={validCVC}
            isSubmitted={isSubmitted}
          />
        </>
      )}
      {isConfirmed && (
        <div className="thank-you">
          <img src="./thankyou.svg" alt="thanks" />

          <p className="thnx">THANK YOU!</p>

          <p className="msg">We've added your card details</p>
        </div>
      )}

      <Button>{isConfirmed ? "Continue" : "Confirm"}</Button>
    </form>
  );
}

function RightMain() {
  const [inputName, setInputName] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [inputCVC, setInputCVC] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputNum = (e) => {
    let newValue = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
    newValue = newValue.slice(0, 16);
    newValue = newValue.replace(/(.{4})/g, "$1 ");
    setInputNumber(newValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      setInputNumber((prevValue) => prevValue.replace(/\s/g, ""));
    }
  };

  const handleInpMonth = (e) => {
    let newValue = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
    newValue = newValue.slice(0, 2);
    newValue = newValue.replace(/(.{3})/g, "");
    newValue < 13 && setInputMonth(newValue);
  };

  const handleInpYear = (e) => {
    let newValue = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
    newValue = newValue.slice(0, 2);
    newValue = newValue.replace(/(.{3})/g, "");
    setInputYear(newValue);
  };

  const handleInpCVC = (e) => {
    let newValue = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
    newValue = newValue.slice(0, 3);
    newValue = newValue.replace(/(.{4})/g, "");
    setInputCVC(newValue);
  };

  const handleInpName = (e) => {
    setInputName(e.target.value);
  };

  return (
    <div className="right-main">
      <FrontCard
        inputName={inputName}
        inputNumber={inputNumber}
        inputMonth={inputMonth}
        inputYear={inputYear}
      />
      <BackCard inputCVC={inputCVC} isConfirmed={isConfirmed} />

      <Form
        inputCVC={inputCVC}
        inputName={inputName}
        inputNumber={inputNumber}
        inputMonth={inputMonth}
        inputYear={inputYear}
        setIsConfirmed={setIsConfirmed}
        isConfirmed={isConfirmed}
        handleInpCVC={handleInpCVC}
        handleInpMonth={handleInpMonth}
        handleInpName={handleInpName}
        handleKeyDown={handleKeyDown}
        handleInpYear={handleInpYear}
        handleInputNum={handleInputNum}
        validName={inputName.trim() !== ""}
        validNum={/^[\d\s]{20}$/.test(inputNumber)}
        validMonth={
          /^\d{1,2}$/.test(inputMonth) && parseInt(inputMonth, 10) <= 12
        }
        validYear={/^\d{2}$/.test(inputYear)}
        validCVC={/^\d{3}$/.test(inputCVC)}
      />
    </div>
  );
}

export default App;
