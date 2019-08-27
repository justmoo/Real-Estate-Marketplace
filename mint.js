const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const abi = require('./eth-contracts/build/contracts/SolnSquareVerifier');
const proofs = require('./proofs');
const MNEMONIC = "conduct conduct apology avoid enlist include empty police train journey bonus remove" // change to the norms
const INFURA_KEY = "6bb910e943dc4083837bf632752601ca" // from the old repo
const NFT_CONTRACT_ADDRESS = "0xB0d189A1F1Cba24d32Ed619519d6eEB2BbFd5352" // contract address
const OWNER_ADDRESS = "0x45a49E66dD63102BaefbBc87F92eE86c50dB4565" // config
const NETWORK = "rinkeby"// rinkeby

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}



async function main() {
    const provider = await new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = await new web3(
        provider
    )
    //const accounts = await web3Instance.eth.getAccounts();
    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(abi.abi, NFT_CONTRACT_ADDRESS, {from: OWNER_ADDRESS,gasLimit: "1000000" });

            for(let i =5; i < 7; i++){
                let Proof = proofs[i].proof;
                let input = proofs[i].inputs;
                
                try{
                    console.log("Minting...");
                   
                    let result = await nftContract.methods.mintNFT(OWNER_ADDRESS,i,Proof.a,Proof.b,Proof.c,input).send({from:OWNER_ADDRESS,gas:500000});
                     console.log(result);
                }catch(e){console.log("error :" + e)}

            }
        } 
    }


main()