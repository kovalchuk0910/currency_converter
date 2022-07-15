import React, { useEffect, useState } from "react";
import CurrencyInputs from "./components/CurrencyInputs";
import Header from "./components/Header";
import './Style.css';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [fromCur, setFromCur] = useState();
  const [toCur, setToCur] = useState();

  const [exchangeCur, setExchangeCur] = useState()
  const [amount, setAmount] = useState(1);
  const [amountBool, setAmountBool] = useState(true);

  const BASE_URL = "https://api.exchangeratesapi.io/latest";

  let myHeaders = new Headers();
  myHeaders.append("apikey", "VfR7EXC38Y38dPHUWFaM17v83m4DqoZv");

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        const firstCurrency = Object.keys(result.rates)[0]
        setCurrencyOptions([result.base, ...Object.keys(result.rates)])
        setFromCur(result.base)
        setToCur(firstCurrency)
        setExchangeCur(result.rates[firstCurrency])
      })
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}?base=${fromCur}&symbols=${toCur}`)
      .then(response => response.json())
      .then(result => (result.rates[toCur]))
  }, [fromCur, toCur])

  let firstAmount, secondAmount;
  if(amountBool) {
    secondAmount = amount;
    firstAmount = amount * exchangeCur;
  } else {
    firstAmount = amount;
    secondAmount = amount / exchangeCur
  }

  const fromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountBool(true)
  }

  const toAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountBool(false)
  }
  
  return (
    <div className="App">
      <Header />
      <div className="inputsBlock">
        <CurrencyInputs 
          currencyOptions={currencyOptions}
          selectCurrency={fromCur}
          changeCurrency = {e => setFromCur(e.target.value)}
          changeAmount={fromAmountChange}
          amount={secondAmount}/>

        <CurrencyInputs 
          currencyOptions={currencyOptions}
          selectCurrency={toCur}
          changeCurrency = {e => setToCur(e.target.value)}
          changeAmount={toAmountChange}
          amount={firstAmount}/>
      </div>
    </div>
  );
}

export default App;
