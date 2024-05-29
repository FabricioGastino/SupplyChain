import Web3 from "web3";

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            }
        ],
        "name": "registerProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            }
        ],
        "name": "getProductHistory",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "products",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "currentOwner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0xe182328c94429808f8ac5b5c7e948ccdaeb215b8";

export async function getMetamaskProvider() {
    if (!window.ethereum) throw new Error('No MetaMask found!');
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error('Permission required!');
    return web3;
}

export async function registerProduct(productId, productDetails) {
    const web3 = await getMetamaskProvider();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    await contract.methods.registerProduct(productId, productDetails).send({ from: accounts[0] });
}

export async function transferProduct(productId, newOwner) {
    const web3 = await getMetamaskProvider();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    await contract.methods.transferProduct(productId, newOwner).send({ from: accounts[0] });
}

export async function getProductHistory(productId) {
    const web3 = await getMetamaskProvider();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const history = await contract.methods.getProductHistory(productId).call();
    return history;
}
