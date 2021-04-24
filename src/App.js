import React ,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import electionabi  from './contracts/election.json';
import Web3 from 'web3'
import Navbar from './Navbar';
import Body from './Body';
import HTT from './HTT';



function App() {

  useEffect(()=> {
    loadWeb3();
    loadBlockchaindata();
  },[]);
const[Currentaccount,setCurrentaccount]=useState("");
const[loader,setloader]=useState(true);
const[Electionsm,setElectionsm]=useState();
const[candidate1,setcandidate1]=useState();
const[candidate2,setcandidate2]=useState();
  const loadWeb3 = async ()=>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
  else if(window.web3)
     {
       window.web3=new Web3(window.web3.currentProvider);
       
     }
    else
     {
       window.alert("not present");
     }

  }
  const loadBlockchaindata = async ()=>{
    setloader(true);
    const web3 = window.web3;
    const accounts= await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId= await web3.eth.net.getId();
    const networkData= electionabi.networks[networkId];

    if(networkData)
    {
      const election=new web3.eth.Contract(electionabi.abi,networkData.address);
  
    const candidate1=await election.methods.candidates(1).call();
   /// const candidate1id=candidate1.id;
    //const candidate1name=candidate1.name;
    //const candidate1votecount=candidate1.votecount;
    const candidate2=await election.methods.candidates(2).call();
    //const candidate2id=candidate2.id;
    //const candidate2name=candidate2.name;
    //const candidate2votecount=candidate2.votecount;
    setcandidate1(candidate1);
    setcandidate2(candidate2);
      setElectionsm(election);
      console.log(election);
      setloader(false);
    }
    else{
      window.alert("contract is not present here");
    }
  
  }
  if(loader){
    return <div>loading..</div>
  }
  const votecanidate = async(canidateid)=>{
    setloader(true);
    await Electionsm.methods.vote(canidateid).send({from : Currentaccount})
    .on('tranctionhash',()=>{
      console.log("successfully ran");
    })
    setloader(false);
  }

  return (
    <div>
     <Navbar account={Currentaccount}/>
     <Body canidate1={candidate1} canidate2={candidate2} votecanidate={votecanidate} account={Currentaccount}/>
     
    </div>
  );
}

export default App;
