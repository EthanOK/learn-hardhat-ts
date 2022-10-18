import Web3 from "web3";

// BSC测试链 RPC URL
var url = 'https://bsc-dataseed1.binance.org/';
var web3 = new Web3(url);
web3.eth.getChainId().then(console.log);