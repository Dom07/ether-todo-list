import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import './App.css';

function App(props) {
  const [todos, setTodos] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    loadBlockChainData();
  },[])

  const loadBlockChainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network =  await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  return (
    <div className="App">
        <h1>Hello World!!</h1>
        <p>Account: {account}</p>
    </div>
  );
}

export default App;
