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
         
         }

     struct quesIPFS{
            address[] solver;
            string[] solutionLink;
            
        }

    struct solLink{
           address solver;
           address[] agree;
           address[] disagree;
           string[] suggestions;
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
    
    //Begin
    function agree(string memory sol) public 
    {
         solutionList[sol].agree.push(msg.sender);
    }
    
    function disagree(string memory sol,string memory feedback) public 
    {
        require(bytes(feedback).length>0); 
        solutionList[sol].disagree.push(msg.sender);
        solutionList[sol].suggestions.push(feedback);
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

    function displayQuestionDetails(string memory ipfs) public view returns(address,uint256,string memory){
     
          return (questionDetails[ipfs].publisher,questionDetails[ipfs].timeEnd,questionDetails[ipfs].date);
      
        
    
   }

//publisher profile page

   function getIpfsQuestionLen() public view returns(uint256){
      
    return publishers[msg.sender].ipfsQuestion.length;

   }
 
   function getSoutionLinkLen(string memory ques) public view returns(uint256){
      
    return questionList[ques].solutionLink.length;

   }
  
  

  function publisherProfile(uint256 i) public view returns(string memory,string memory){
         

       return (publishers[msg.sender].ipfsQuestion[i],questionDetails[publishers[msg.sender].ipfsQuestion[i]].date) ;

   }

  
function solutionLinkList(string memory ques,uint i)public view returns(string memory){

        return questionList[ques].solutionLink[i];
}

function solutionLinkDetails(string memory sol)public view returns(address,string memory){

        return(solutionList[sol].solver,solutionList[sol].readMe);

}




  
  
//vote details


function getSolverSolutionLinks(string memory ipfs)public view returns(uint256){
 return questionList[ipfs].solutionLink.length;
        
}

 function getSolutionLink(uint256 i,string memory ipfs) public view returns(string memory){
  return questionList[ipfs].solutionLink[i];
 
 } 


 function getVoteLength(string memory sol) public view returns(address[] memory,address[]memory ,address){

   return (solutionList[sol].agree,solutionList[sol].disagree,solutionList[sol].solver);
 }



 //solver profile

  function getSolverSolution()public view returns(uint256){
        return solvers[msg.sender].solutionLink.length;
}
  
 
 function getSolution(uint256 i) public view returns(string memory,string memory){

    return (solvers[msg.sender].solutionLink[i],solvers[msg.sender].readMeIPFS[i]);

 }
 
//to verify duplicate questions








  
}





