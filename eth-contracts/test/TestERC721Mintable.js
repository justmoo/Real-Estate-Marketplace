var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const base = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i=0; i<10;i++){
                this.contract.mint(account_one,i,base,{from:account_one});
            }
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply();
            assert.equal(10,result,"it doesn't match")
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(account_one);
            assert.equal(10,result,"the balance isn't correct");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            try{
            let result = await this.contract.TokenToBaseURI(1,{from:account_one});
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1",result,"There is no token");
            }catch(e){
               
            }
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one,account_two,2,{from:account_one});
            let result = await this.contract.ownerOf(2);
            assert.equal(account_two,result,"account 1 doesn't own the token");

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
                let errors =false;
            try{
            let result = await this.contract.mint(account_two,11,base,{from:account_three});
            }catch(e){
                    errors = true;
            }
            assert.equal(errors,true,"it shouldn't accept other than the owner, I FAILED");
            
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner();
            assert.equal(result,account_one,"the owner isn't what you put");
        })

    });
})