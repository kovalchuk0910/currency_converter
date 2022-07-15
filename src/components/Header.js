import React, { useEffect, useState } from "react";

export default function Header() {
    const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20220715&json"
    const [headerCurrencies, setHeaderCurrencies] = useState([])

    const neededCurrencies = ["USD", "EUR"];

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(response => response.filter(el => neededCurrencies.includes(el.cc)))
            .then(result => setHeaderCurrencies(result))
    }, [])

    return(
        <header className="header">
            <h2>Текущие курсы</h2>
            {headerCurrencies.map(item => 
                <h3>{item.cc}: {item.rate}</h3>
            )}
        </header>
    )
}