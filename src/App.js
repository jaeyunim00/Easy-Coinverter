import React, { useEffect } from "react";

function App() {
  const [coins, setCoins] = React.useState([]);
  const [coin, setCoin] = React.useState("");

  const regex = new RegExp(`${coin}`, "gi");

  const handleCoinChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
    console.log(coin);
  };

  const handleCoinSubmit = (event) => {
    event.preventDefault();
    const coinNameArr = coins.map((coin) => {
      return coin.name;
    });

    console.log(regex);
    const filteredArr = coinNameArr.filter((item) => regex.test(item));
    console.log(filteredArr);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
  }, []);

  return (
    <div className="App">
      <div class="header">
        <span class="material-symbols-outlined">currency_bitcoin</span>
        <span>Coinverter</span>
      </div>
      <div class="coin_input">
        <span>TyPe cOiN</span>
        <form method="get" onSubmit={handleCoinSubmit}>
          <input type="text" value={coin} onChange={handleCoinChange} />
        </form>
      </div>
      <div class="coin_list">
        {coins.map((coin) => {
          return <div key={coin.id}>{coin.name}</div>;
        })}
      </div>
      <h1></h1>
    </div>
  );
}

export default App;
