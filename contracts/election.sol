//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract election{
    
    
    struct candidate{
        uint id;
        string name;
        uint votecount;
    }
    uint public candidate_count;
    mapping(uint=>candidate)public candidates;
    mapping(address=>bool)voterdonot;
    event electionupdated(
         uint id
    
        );


constructor()
{
    addcandidate(" barack");
    addcandidate("donald trump");
}






function addcandidate(string memory name ) private {
    candidate_count++;
    candidates[candidate_count]=candidate(candidate_count,name,0);}
   
    function vote(uint id) public{
        require(!voterdonot[msg.sender],'you have voted for thr participant');
        require(id>0&&id<=candidate_count,'the id doesnt exist');
        candidates[id].votecount+=1;
        voterdonot[msg.sender]=true;
        emit electionupdated(id);
    }
}



