import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { init, sendCoin } from "./Web3Client";
import MetaCoinContractBuild from "contracts/MetaCoin.json";

function App() {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [network_id, setNetworkId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [sended, setSended] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      const { web3, account } = await init(setAccount);
      const network_id = await web3.eth.net.getId();
      const metaCoinContract = new web3.eth.Contract(
        MetaCoinContractBuild.abi,
        MetaCoinContractBuild.networks[network_id].address
      );
      setWeb3(web3);
      setAccount(account);
      setContract(metaCoinContract);
      setNetworkId(network_id);
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (web3 && account) {
        const balance = await web3.eth.getBalance(account);
        setBalance(balance);
      }
    };
    getBalance();
  }, [web3, account]);

  const sendTransaction = async () => {
    if (!sended && contract && account) {
      const tx = await sendCoin(
        contract,
        "0x440fF4F42fF21E3e4BA1f96c02E47067aa338BB3",
        account,
        100
      );
      console.log("sended, tx: ", tx);
      setSended(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{account}</p>
        <p>balance is: {balance}</p>
        {!sended && (
          <button onClick={() => sendTransaction()}>Send Money</button>
        )}
      </header>
    </div>
  );
}

export default App;
