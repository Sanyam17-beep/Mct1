import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
 
  const [num, setNum] = useState("Light");
  const toggleTheme=()=>{
    if(theme==="dark-theme"){
      setTheme("light-theme");
      setNum("Dark");
      
    }
    else{
      setTheme("dark-theme");
      setNum("Light");
     
    }
  }
  const [theme, setTheme] = useState("light-theme");
  
  useEffect(()=>{
document.body.className=theme;
  },[theme]);
  useEffect(() => {
    axios
    .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      
      <div className='coin-search'>
      <button type="button" class="btn btn-light" onClick={()=>toggleTheme()}>{num}</button>
        <form >
          
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      <div className='format'></div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
