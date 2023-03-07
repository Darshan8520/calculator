import React, { useState } from 'react';
import './App.css';
import moonIcon from './images/moon.png'
import sunIcon from './images/sun.png'
import Header from './Components/Header/Header';
import Keypad from './Components/Keypad/Keypad';

let usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operators = ["-", "+", "*", "/"];
function App() {
  let [isdarkmode, setisdarkmode] = useState(false)
  let [expression, setexpression] = useState("")
  let [result, setresult] = useState("")
  let [History, setHistory] = useState([])
  let handlekeypress = (keycode, key) => {
    // console.log(keycode,key)
    // keycode=keycode+" "
    if (!keycode) return;
    if (!usedKeyCodes.includes(keycode)) return

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return
      }
      calculateResult(expression + key)
      setexpression(expression + key)
      // console.log("number")

    }
    else if (operators.includes(key)) {
      // console.log("operator");
      if (!expression) return

      let lastchar = expression.slice(-1)
      if (operators.includes(lastchar)) return;
      if (lastchar === ".") return
      setexpression(expression + key)
    }

    else if (key === ".") {
      if (!expression) return
      let lastchar = expression.slice(-1)
      if (!numbers.includes(lastchar)) return
      setexpression(expression + key)
    }
    else if (keycode === 8) {
      // console.log("Backspace");
      if (!expression) {
        setresult("")
        return
      }
      calculateResult(expression.slice(0, -1))
      setexpression(expression.slice(0, -1))
    }

    else if (keycode === 13) {
      // console.log("Enter");
      if (!expression) return
      calculateResult(expression)
      let temphistory = [...History]


      if (History.length > 20) temphistory = temphistory.splice(0, 1)

      temphistory.push(expression)
      setHistory(temphistory)
    }
  }

  let calculateResult = (exp) => {
    if (!exp) return
    let lastchar = exp.slice(-1)
    if (!numbers.includes(lastchar)) exp = exp.slice(0, -1)
    let answer = eval(exp).toFixed(2) + "";
    setresult(answer)
  }
  return (
    <div className="app" tabIndex="0" onKeyDown={(event) => handlekeypress(event.keycode, event.key)} data-theme={isdarkmode ? "dark" : ""}>
      <div className='app_calculator'>
        <div className='app_calculator_navbar'>
          <div className='app_calculator_navbar_toggle' onClick={() => setisdarkmode(!isdarkmode)}>
            <div className={`app_calculator_navbar_toggle_circle ${isdarkmode ? "app_calculator_navbar_toggle_circle_active" : " "}`} />
          </div>
          <img src={isdarkmode ? moonIcon : sunIcon} alt="mode" />
        </div>
        <Header expression={expression} result={result} history={History} />
        <Keypad handlekeypress={handlekeypress} />
      </div>
    </div>
  );
}

export default App;
