// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var proofs = require("../../zokrates/code/square/proof.json");
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');
contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    describe('Testing SolnSquareVerifier', function () {
        beforeEach(async function () { 
            const verifier = await Verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifier.address, {from: account_one});

            // TODO: mint multiple tokens
            // for(let i=0; i<10;i++){
            //     this.contract.mint(account_one,i,base,{from:account_one});
            // }
        })

        it("can mint", async function () { 
            
            let proof = proofs.proof;
            let input = proofs.inputs;
            
            let result = await this.contract.mintNFT.call(account_one,1,proof.a,proof.b,proof.c,input,{from:account_one});

            
            
            assert.equal(result,true,"the mint function isn't working");
        });

        it("ERC721 token can be minted for contract", async function () { 
            
            let index = 1;
            let result = await this.contract.mint.call(account_one,index,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:account_one});
                assert.equal(result,true,"You are not the owner")
                
        });
    });

    
})