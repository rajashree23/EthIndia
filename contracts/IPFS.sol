//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity >=0.4.21 <0.7.0;
contract IPFS {
   string[] questiondetails;
    
    struct Publisher{
          string[] ipfsQuestion;
       }
   struct quesDetails{
         address publisher;
         uint256 reward;
         uint256 timeStart;
         uint256 timeEnd;
         string date;
         address solver;

         
         }

     struct quesIPFS{
            address[] solver;
            string[] solutionLink;
            
        }

    struct solLink{
           address solver;
           address[] agree;
           address[] disagree;
           
           string readMe;
            }


    struct Solver{

            address solver;
            string[] solutionLink;
            string[] readMeIPFS;
            
      
        }
    
     mapping(string => bool) questions;
     mapping(address => Publisher) publishers;
     mapping(address => Solver) solvers;
     mapping(string => quesDetails) questionDetails;
     mapping(string => quesIPFS) questionList;
     mapping(string => solLink)solutionList;
     mapping(string => mapping(address => bool)) voted;
    
    //Begin
    function agree(string memory sol) public 
    {
         require(!voted[sol][msg.sender]);
         solutionList[sol].agree.push(msg.sender);
         voted[sol][msg.sender]=true;
        
    }
    
    function disagree(string memory sol) public 
    {
          require(!voted[sol][msg.sender]);
        solutionList[sol].disagree.push(msg.sender);
        voted[sol][msg.sender]=true;
    }
    //End


  //uploading question

     function publisherUploadQues(string memory questionIpfs,uint256 reward,string memory dateTime) public{
              
                require(questions[questionIpfs]==false);
                publishers[msg.sender].ipfsQuestion.push(questionIpfs);
                
                
                
                questions[questionIpfs]=true;
                questiondetails.push(questionIpfs);

                questionDetails[questionIpfs].publisher=msg.sender;
                questionDetails[questionIpfs].reward=reward;
                questionDetails[questionIpfs].timeStart=now;
                questionDetails[questionIpfs].timeEnd=now+604800;
                questionDetails[questionIpfs].date=dateTime;
                questionDetails[questionIpfs].solver=address(0);

                

          

      }

 //solution push
   function solverUploadSol(string memory questionIpfs,string memory readMeIpfs,string memory sol) public{
  

             
             require(now<=questionDetails[questionIpfs].timeStart+604800); 
             questionList[questionIpfs].solver.push(msg.sender);
             questionList[questionIpfs].solutionLink.push(sol);
                


             solutionList[sol].solver=msg.sender;
             solutionList[sol].readMe=readMeIpfs;              

             solvers[msg.sender].solver=msg.sender;
             solvers[msg.sender].solutionLink.push(sol);
             solvers[msg.sender].readMeIPFS.push(readMeIpfs);

      }





   
// question details
     
    function getQuestionListLength() public view returns(uint256){

       return questiondetails.length;
   }


    function getQuestionKey(uint256 i) public view returns(string memory){

     return questiondetails[i];
   }

    function displayQuestionDetails(string memory ipfs) public view returns(address,uint256,string memory,address){
     
          return (questionDetails[ipfs].publisher,questionDetails[ipfs].timeEnd,questionDetails[ipfs].date,questionDetails[ipfs].solver);
      
        
    
   }

//publisher profile page

   function getIpfsQuestionLen() public view returns(uint256){
      
    return publishers[msg.sender].ipfsQuestion.length;

   }
 
   function getSoutionLinkLen(string memory ques) public view returns(uint256){
      
    return questionList[ques].solutionLink.length;

   }
  
  

  function publisherProfile(uint256 i) public view returns(string memory,uint256,string memory){
         

       return (publishers[msg.sender].ipfsQuestion[i],questionDetails[publishers[msg.sender].ipfsQuestion[i]].reward,questionDetails[publishers[msg.sender].ipfsQuestion[i]].date) ;

   }

  
function solutionLinkList(string memory ques,uint i)public view returns(string memory){

        return questionList[ques].solutionLink[i];
}

function solutionLinkDetails(string memory sol)public view returns(address,string memory){

        return(solutionList[sol].solver,solutionList[sol].readMe);

}




  //set result
function setResult(string memory ipfs,address resSolver)public  returns(uint256){
  questionDetails[ipfs].solver=resSolver;
  return 0;
}
  
//vote details


function getSolverSolutionLinks(string memory ipfs)public view returns(uint256){
 return questionList[ipfs].solutionLink.length;
        
}

 function getSolutionLink(uint256 i,string memory ipfs) public view returns(string memory,address){
  return (questionList[ipfs].solutionLink[i],solutionList[questionList[ipfs].solutionLink[i]].solver);
 
 } 


 function getsolver(string memory sol) public view returns(address){

   return (solutionList[sol].solver);
 }



 //solver profile

  function getSolverSolution()public view returns(uint256){
        return solvers[msg.sender].solutionLink.length;
}
  
 
 function getSolution(uint256 i) public view returns(string memory,string memory){

    return (solvers[msg.sender].solutionLink[i],solvers[msg.sender].readMeIPFS[i]);

 }
 
//to verify duplicate questions


//calculating max accuracy
 function getAccuracy(string memory sol) public view returns (uint256){
        uint256 x=solutionList[sol].agree.length;
        uint256 y=solutionList[sol].disagree.length;
        uint256 denominator=x+y;
        if(denominator==0)
        return 0;
        uint256 numerator = x*100;
        return numerator/denominator;
        
    }





  
}





