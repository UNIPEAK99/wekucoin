// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import wiwicoin_artifacts from './contracts/MetaCoin.json'

window.HomeApp = {

  start: function() {

    var WiwiCoin = contract(wiwicoin_artifacts);
    WiwiCoin.setProvider(web3.currentProvider);
    //WiwiCoin.defaults({from: web3.eth.coinbase});

    const account = $('#current-account').text();

    //var self = this;
    var deployed;
    WiwiCoin.deployed().then(function(instance) {
      deployed = instance;
      return deployed.getBalance.call(account);
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      //alert(JSON.stringify(value));
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
    });

  },

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 WiwiCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  HomeApp.start();
});
