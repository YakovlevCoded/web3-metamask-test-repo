import Web3 from "web3";

export const init = async (setAccount) => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    console.log("Metamask is installed");
    const accaunts = await provider.request({ method: "eth_requestAccounts" });
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
    return { web3: new Web3(provider), account: accaunts[0] };
  }
};

export const sendCoin = (metaCoinContract, address, account, amount) => {
  console.log(metaCoinContract.methods);
  return metaCoinContract.methods
    .sendCoin(address, amount)
    .send({ from: account });
};
