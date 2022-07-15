import React from "react";

export default function CurrencyInputs(props) {
    const {
        currencyOptions,
        selectCurrency,
        changeCurrency,
        changeAmount,
        amount,
    } = props

    return(
        <div>
            <input className="inputs" type="number" value={amount} onChange={changeAmount}/>
            <select className="select" value={selectCurrency} onChange={changeCurrency}>
                {currencyOptions.map(item =>
                    <option value={item} key={item}>{item}</option>
                )}
            </select>
        </div>
    )
}