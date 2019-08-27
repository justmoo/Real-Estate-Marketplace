pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    Verifier private _verifier;

// TODO define a solutions struct that can hold an index & an address
 struct Solutions {
    uint256 index;
    address _address;
 }
constructor(address _address)public {
    _verifier = Verifier(_address);
}
// TODO define an array of the above struct
    mapping(bytes32 => Solutions) solutions;
// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) submittedSolutions;


// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address _address);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(uint256 _index,bytes32 Sol, address _address)public {
    //save the struct
    Solutions memory S = Solutions({index:_index,_address:_address});
    // add it to the mapping
    solutions[Sol] = S;
    //emit the event
    emit SolutionAdded(_index,_address);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

function mintNFT(address _address,uint256 index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bool) {

{
bytes32 Sol = keccak256(abi.encodePacked(a,b,c,input));
// checking if there is a sotution before.
require(submittedSolutions[Sol] == false,"minted already");
// checkin the metadata
require(_verifier.verifyTx(a,b,c,input)== true , "check your inputs");
// add it to the mapping and declare it's there anymore 
submittedSolutions[Sol] = true;
//call the function to add it
addSolution(index,Sol,_address);
//call the super
return super.mint(_address,index,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");


}






}





}











