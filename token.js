 // varaible declation:
    let mainnet = "https://bsc-dataseed.binance.org";
    let tokenaddress = '0x9e4e29252619ad0b6e3986e776ee07400e36c61c';
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider(mainnet));
    }
    let bep20abi = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
    let tokenInst = new web3.eth.Contract(bep20abi, tokenaddress);    

    // function to create a new wallet;
    function CreateWallet(){
        createWallet = cb => {
            cb(web3.eth.accounts.create());
          };
          createWallet(result => {
            document.getElementById("showBalance").style.display = "none";
            document.getElementById("sendtoken").style.display = "none";
            document.getElementById("walletAddress").innerHTML = result.address;
            document.getElementById("walletPrivateKey").innerHTML = result.privateKey;
            document.getElementById("createwallet").style.display = "block";
          });
    }
    // function to show balance of wallet;
    function BalanceOfWallet() {
        let wallet_address;
        wallet_address = document.getElementById("showbalanceaddress").value;
        console.log(typeof wallet_address);
        tokenInst.methods.balanceOf(wallet_address).call().then(function (bal) {
          console.log(typeof bal);
            document.getElementById("balanceofwallet").innerHTML = bal;
          });
    }
    function Show() {
      document.getElementById("createwallet").style.display = "none";
      document.getElementById("sendtoken").style.display = "none";
      document.getElementById("showBalance").style.display = "block";
    }
    function Send() {
      document.getElementById("createwallet").style.display = "none";
      document.getElementById("sendtoken").style.display = "block";
      document.getElementById("showBalance").style.display = "none";
    }
    // function to send token;
    function SendToken() {
      TokenSending().then();
    }
    async function TokenSending() { 
        let mywalletprivatekey = document.getElementById("privatekey").value;
        let receive_ewallet_address = document.getElementById("receiveaddress").value;
        let send_ewallet_address = document.getElementById("sendaddress").value;
        let amount = Number(document.getElementById("amount").value);
        console.log('mywalletprivatekey: ', mywalletprivatekey);
        console.log('sendaddress: ', send_ewallet_address);
        console.log('receiveaddress: ', receive_ewallet_address);
        console.log('amount: ', amount);
        const data = tokenInst.methods.transfer(receive_ewallet_address, amount).encodeABI();
        let gasLimit = 300000;
        const gasPrice  = await web3.eth.getGasPrice();
        console.log("data",data);
        console.log('gasPrice: ', gasPrice);
        var signedTx = await web3.eth.accounts.signTransaction(
          {
              from: send_ewallet_address,
              to: tokenaddress,
              data: data,
              gasLimit: gasLimit,
              gasPrice: gasPrice,
              value: '0x' 
          },
          mywalletprivatekey
        );
        try {
            const success = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(success);
            alert("Sending token has been success");
        } catch (e) {
            console.log(e);
            alert("Sending token has been failed")
        }
       }
       