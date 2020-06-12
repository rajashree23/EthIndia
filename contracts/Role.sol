pragma solidity >=0.4.21 <0.7.0;


/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}

contract Role {

    using Roles for Roles.Role;
     Roles.Role private Deployer;
     Roles.Role private admins;
     Roles.Role private publishers;
     Roles.Role private voters;
     Roles.Role private solvers;

    //add admins
     function addAdmins(address _newAdmin) external onlyDeployer(){
        admins.add(_newAdmin);
      }


   //add publisher
   function addPublisher() external{
       publishers.add(msg.sender);
   }


   function removePublisher(address _publisher) external onlyAdmins{
       publishers.remove(_publisher);
   }

   function verifyPublisher() external view returns(bool){
       return publishers.has(msg.sender);
   }

    function addSolver() external{
       solvers.add(msg.sender);
   }

   function removeSolver(address _solver) external onlyAdmins{
       solvers.remove(_solver);
   }
   //verify solvers
    function verifySolver() external view returns(bool){
       return solvers.has(msg.sender);
   }

  //add voters
   function addVoter() external{
       voters.add(msg.sender);
   }

   function removeVoter(address _voter) external onlyAdmins{
       voters.remove(_voter);
   }

   //verify voters
   function verifyVoter() external view returns(bool){
       return voters.has(msg.sender);
   }
   //modifiers
    modifier onlyDeployer(){
    require(Deployer.has(msg.sender),"Only Deployer can add Admins");
    _;
   }
    modifier onlyAdmins(){
    require(admins.has(msg.sender),"Only Admins can do this job!");
    _;
   }
}
