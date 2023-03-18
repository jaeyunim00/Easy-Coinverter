import React, { useEffect } from "react";

function App() {
  // BASE CONST
  const [coins, setCoins] = React.useState([]);
  const [coinName, setCoinName] = React.useState("");
  const [filteredCoin, setFilteredCoin] = React.useState([]);

  //CONVERETER CONST
  const [USD, setUSD] = React.useState("");
  const [coinValue, setCoinValue] = React.useState("");

  const regex = new RegExp(`^${coinName}$`);

  const handleCoinNameChange = (event) => {
    event.preventDefault();
    setCoinName(event.target.value);
    console.log(coinName);
  };

  const handleCoinSubmit = (event) => {
    event.preventDefault();

    setFilteredCoin(coins.filter((item) => regex.test(item.symbol)));

    console.log(filteredCoin);
  };

  const handleUSDChange = (event) => {
    setUSD(event.target.value);
  };

  const handleCoinChange = (event) => {
    setCoinValue(event.target.value);
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
        <form method="get" onSubmit={handleCoinSubmit}>
          <span>코인 코드 검색</span>
          <input
            placeholder="e.g bitcoin 또는 BTC"
            type="text"
            value={coinName}
            onChange={handleCoinNameChange}
          />
        </form>
      </div>
      {filteredCoin.map((item) => (
        <div class="coin_converter">
          <div class="coin_converter_coinName">
            {item.name}({item.symbol})
          </div>
          <div class="coin_converter_price">
            <p>1฿ = {item.quotes.USD.price * 1300}₩</p>
          </div>
          <div className="convert_value">
            <input value={USD} onChange={handleUSDChange} />
            <input
              value={1300 / (USD / item.quotes.USD.price)}
              onCHange={handleCoinChange}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
