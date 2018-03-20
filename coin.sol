pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2; 


// Library Deployed Address : 0x96426Bf0d20CF59f55093F9327F10A5bc28209Ff
// Contract Deployed Address : 0x7501ef246b78912A3D6dA0dbF79f131c03eF6DB0




library SafeMathLib{

    function times(uint64 a, uint64 b) returns (uint64){

        uint64 c = a*b; 

        assert (a==0 || c/a == b);

        return c; 

    }

    function minus(uint64 a, uint64 b ) returns (uint64) {


        assert(b<=a);

        return a-b;

    }

    function plus(uint64 a, uint64 b) returns (uint64){

        uint64 c= a+b; 
        assert(c>=a && c>=b) ;
        return c;

    }

    function divided(uint64 a, uint64 b) returns (uint64) {
        require(b > 0);
        uint64 c = a / b;
        return c;
    }

    function assert(bool assertion) private{

        if(!assertion) throw;

    }

}

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {

    function totalSupply() constant returns (uint64 supply) {}
    function balanceOf(address _owner) constant returns (uint64 balance) {}
    function transfer(address _to, uint64 _value) returns (bool success) {}
    function transferFrom(address _from, address _to, uint64 _value) returns (bool success) {}
    function approve(address _spender, uint64 _value) returns (bool success) {}
    function allowance(address _owner, address _spender) constant returns (uint64 remaining) {}
    event Transfer(address indexed _from, address indexed _to, uint64 _value);
    event Approval(address indexed _owner, address indexed _spender, uint64 _value);
}





// ----------------------------------------------------------------------------
// ERC20 Token, with the addition of symbol, name and decimals and assisted
// token transfers
// ----------------------------------------------------------------------------
contract coin is ERC20Interface {
   
    using SafeMathLib for uint64; 

    address owner; 
    bytes32 public symbol;
    bytes32 public  name;
    uint8 public decimals;
    uint64 public totalSupply;
    uint64 public totalCoinPower;
    uint64 public TVA;
    //uint public questions;
    //uint public answers;

    uint64 public LDCR;
    uint64 public LDVA;

    struct ans_instance {
        uint8 reaction;
        uint16 upvotes;
        uint16 downvotes;
        bytes32 ansId;
    }


    /*
    struct que_instance {

        bool follow;
        uint32 followers; 
        bytes32 queId; 
    };  

    */
    
    
    struct Answer{
        address author;
        uint16 upvotes;
        uint16 downvotes;
        uint64 coinsMade;   // frontend me moti k form me
        uint64 lastModificationTimestamp;
        uint64 creationTimestamp;
        uint64 vaa;         //  value addition of answer
        bytes32 ansId;      // ansId will be same as initial hash 
        bytes32 ans_hash;   // ans_hash will change if edit 
        bytes32 queId;
        bool isValid;     // to check if answer is valid
        
        
    }
    
    struct  Question{
        address author;
        uint32 followers;
        uint64 coinsMade;
        uint64 lastModificationTimestamp;
        uint64 creationTimestamp;
        bytes32 queId;
        bytes32 que_hash;
        mapping ( bytes32 => Answer ) answers; //ans_id---ans_hash
        bytes32[] answerIndex;   // A list of answer indexes to enumerate keys of the above mapping 
        bool isValid;       // to check if answer is valid 

    }
    
     struct redeem_token {
        uint8 no_of_redeems; 
        uint8 span_over_weeks;//last_time_redeem
        uint64 amount; 
        uint64 time_of_redeem; //time of power_down
        
    }

    
    struct Profile{

        uint64 coinPower;
        uint64 vau;
        uint64 lastSettlementTimestamp;
        uint64 coins;
        uint8 ipower;
        
        mapping (bytes32 => ans_instance ) answersReacted;   // key : answerId and value: is bande k reaction
        bytes32[] answersReactedIndex;                       // A list of keys to enumerate above mapping 
        mapping (bytes32 => Answer) answersWritten;          // key : answerId and value: Answer struct
        bytes32[] answersWrittenIndex;                    
        mapping (bytes32 => Question ) ques;              // key : questionId and value : is bande k Question ki information 
        bytes32[] questionsIndex;                            // A list of keys to enumerate above mapping 
        bytes32 userName;  
        redeem_token[] redeems;
        
    }

 
    mapping (address => Profile) public users;
    mapping (bytes32 => Question) public questions;  // Overall questions key : quesId and value : Question object


    bytes32[] public questionsIndex;            // Index for above mapping
    
    Answer[] public allAnswers; 
    
    mapping( bytes32 => Answer) answerMapping; 

    
    // 1- Ans
    // 2- Que
    // 3- upvote
    // 4- downvote
    // 5- follow
    mapping(uint8 => uint8) public work;
   
    
    mapping(address => mapping(address => uint64)) allowed;



    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    function coin() public {
        
        owner = msg.sender;
        symbol = "coin";
        name = "coin Token";
        decimals = 8;
        LDCR = 10**9;
        LDVA = 10**4; 
        
        work[1] = 20;
        work[2] = 10;
        work[3] = 1;
        work[4] = 1;
        work[5] = 1;
        
        

        totalSupply = 10000000000000000;
        users[msg.sender].coins=totalSupply;     // Give all initial token to contract creator
        Transfer(address(0), msg.sender, totalSupply);
        
    }


    // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public constant returns (uint64) {
        return totalSupply  - users[address(0)].coins;
    }


    // ------------------------------------------------------------------------
    // Get the token balance for account tokenOwner
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) constant returns (uint64 balance) {
        return users[tokenOwner].coins;
    }


    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to to account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint64 tokens) public returns (bool success) {
        if(users[msg.sender].coins >= tokens && tokens> 0){
            users[msg.sender].coins = users[msg.sender].coins.minus(tokens);
            users[to].coins = users[to].coins.plus(tokens);
            Transfer(msg.sender, to, tokens);
            return true;
        }else {

            return false;

        }

    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces 
    // ------------------------------------------------------------------------
    function approve(address spender, uint64 tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Transfer tokens from the from account to the to account
    // 
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the from account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint64 tokens) public returns (bool success) {
        users[from].coins = users[from].coins.minus(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].minus(tokens);
        users[to].coins = users[to].coins.plus(tokens);
        Transfer(from, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) constant returns (uint64 remaining) {
        return allowed[tokenOwner][spender];
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account. The spender contract function
    // receiveApproval(...) is then executed
    // ------------------------------------------------------------------------
    

    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function () public payable {
        revert();
    }


    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint64 tokens) public returns (bool success) {
        
        require(msg.sender == owner);
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }

    function valueAddition (uint8 work, uint8 ipower) internal returns(uint64 va)  {
        return uint64(work).times(uint64(ipower));
    }

    
    

   function VAU(address user, uint8 work) internal returns(uint64){
        uint64 cp = users[user].coinPower;
        uint64 offset = 10**16;
        uint64 num = offset.times(valueAddition(work, users[user].ipower).times(cp)); 
        uint64 vau = num.divided(totalCoinPower);
        users[user].vau += vau; 
        return vau;
    }
    
    function VAU2(address user, uint16 diff) internal returns(uint64){ 
        
        uint64 cp = users[user].coinPower;
        uint64 offset = 10**16;
        uint64 num = offset.times(uint64(diff).divided(10).times(cp)); 
        uint64 vau = num.divided(totalCoinPower);
        users[user].vau += vau; 
        TVA += vau; 
        return vau;
        
        
    }
    
    function diffInWeeks(uint64 time1, uint64 time2) private returns (uint32) {
        
        uint64 diff = time2 - time1;   // diff is in milliseconds
        require(diff>0);
        
        uint32 weeksDiff = uint32(diff.divided(1000*84600*7));  
          
        return weeksDiff;     
        
        
        
    }

    function TVAupdate(address user, uint8 work) private returns(uint64){
        uint64 val=VAU(user, work);
        TVA += val;
        return val; 
    }


    function userRefresh() public{
        
        
        //coin power refresh
        address banda = msg.sender;
        uint64 coins = 0; 
        redeem_token[] storage rd = users[banda].redeems;
        uint i;   // iterator
        for(i=0; i<rd.length; i++)
        {
            coins += rd[i].amount.times(uint64(diffInWeeks(rd[i].time_of_redeem, uint64(now))).divided(rd[i].span_over_weeks));
        }
        users[banda].coinPower -= coins;
        totalCoinPower -= coins;
        users[banda].coins += coins;
        
        
        //vote profit
        for(i=0; i< users[msg.sender].answersReactedIndex.length;++i){
            
            ans_instance storage ai = users[msg.sender].answersReacted[users[msg.sender].answersReactedIndex[i]];
            
            Answer storage answer = answerMapping[users[msg.sender].answersReactedIndex[i]];
            
            uint16 diffUpvotes;
            uint16 diffDownvotes;
            
            if(ai.reaction == 3){
                
                diffUpvotes = answer.upvotes - ai.upvotes; // assuming latest answer updates will be >= upvotes in a reaction 
                VAU2(msg.sender, diffUpvotes);
                
                
            }else if(ai.reaction == 4){
                
                diffDownvotes = answer.downvotes - ai.downvotes;
                VAU2(msg.sender, diffDownvotes);
                
            }
            
            ai.upvotes = answer.upvotes; 
            ai.downvotes = answer.downvotes; 
            
            
        
        }
        
        
    }

     function coinRelease () view internal returns(uint64 coins) {
        uint64 activity_change = LDCR.times(totalSupply).times(TVA-LDVA).divided(LDVA).plus(LDCR.times(totalSupply));
        uint64 vad = activity_change.divided(1000000000000000);
        if(vad >= 10000000000 ){
            
            return 10000000000;
            
        }else{
            
            return vad;  
        }
        
    }
    
    

      function power_up (uint64 coins) public returns(bool res) {
        if(users[msg.sender].coins >= coins){
            users[msg.sender].coins = users[msg.sender].coins.minus(coins);
            users[msg.sender].coinPower = users[msg.sender].coinPower.plus(coins);
            totalCoinPower = totalCoinPower.plus(coins);
            return true;
        }
        else
            return false;
       }

      function power_down (uint64 coinPower) public returns(bool res)  {
        if(users[msg.sender].coinPower >= coinPower){
            redeem_token memory rd;
            rd.amount = coinPower;
            rd.span_over_weeks = 20;
            rd.time_of_redeem = uint64(now);
            rd.no_of_redeems = 0;
            users[msg.sender].redeems.push(rd);
        }else
            return false;                       
     }

      function NoteReactionAns(bytes32 queId, bytes32 ansId, uint8 reaction) public {
        //NoteReaction
        //va for author if upvote
        // va to user
        require(questions[queId].isValid == true);

        Question storage q = questions[queId];

        require(q.answers[ansId].isValid == true);
    
        Answer storage ans = q.answers[ansId];

        require(users[msg.sender].answersReacted[ansId].reaction == 0 ); 

        ans.vaa += TVAupdate(msg.sender, work[reaction]);

        if(reaction == 3)
            ans.upvotes++;
        if(reaction == 4)
            ans.downvotes++;
        
        ans_instance memory ai;

        ai.reaction = reaction;
        ai.upvotes = ans.upvotes;
        ai.downvotes = ans.downvotes;
        ai.ansId = ansId; 

        users[msg.sender].answersReacted[ansId]=ai; 
        
        if (reaction == 3){  //upvote and follow award money to author 
            ans.vaa += TVAupdate(ans.author, reaction);
        }
      }
      
      /*

     function NoteReactionQue(uint8 queId, uint8 reaction){
        //NoteReaction
        //va for author if upvote
        // va to user
        TVAupdate(msg.sender, reaction);
        if (reaction == 5){  //upvote and follow award money to
            TVAupdate([ansId].author, reaction);
        }
     }  */
 
    function addQuestion(bytes32 _hash) public{

        Question memory q;
        q.author = msg.sender; 
        q.lastModificationTimestamp = uint64(now);
        q.creationTimestamp = uint64(now); 
        q.queId = _hash;     // ipfs hash on adding question to ipfs 
        q.que_hash = _hash;   // Initial hash 
        q.isValid=true; 

        questionsIndex.push(_hash);
        questions[_hash]=q; 
        TVAupdate(msg.sender, work[2]); 
        
    }

    function addAnswer(bytes32 _queId, bytes32 _hash) public {  //  Give question id as input 

        require(questions[_queId].isValid == true);     // Check if this question exist 

        Answer storage answer;

        answer.author=msg.sender;
        answer.lastModificationTimestamp = uint64(now);
        answer.creationTimestamp = uint64(now); 
        answer.ans_hash = _hash;
        answer.ansId = _hash; 
        answer.queId = _queId; 
        answer.isValid = true; 

        questions[_queId].answerIndex.push(_hash);
        questions[_queId].answers[_hash] = answer; 
        
        allAnswers.push(answer);
        answerMapping[_hash]=answer; 
        
        TVAupdate(msg.sender, work[1]);
        
        


    }

    function followQuestion(bytes32 _queId) public{    // We only need the question id to follow

        require(questions[_queId].isValid == true);     // Check if this question exist 

        Question storage question = questions[_queId];
        question.followers += 1; 

    }

    function updateQuestion(bytes32 _queId, bytes32 _hash) public {

        require(questions[_queId].isValid==true);     // Check if this question exist       

        Question storage question = questions[_queId];

        require(question.author == msg.sender);   // If msg.sender is the author of this question 

        question.que_hash = _hash;
        question.lastModificationTimestamp = uint64(now); 
    }

    function updateAnswer(bytes32 _queId, bytes32 _ansId, bytes32 _hash) public{

        require(questions[_queId].isValid == true);     // Check if this question exist  

        Question storage question = questions[_queId];

        require(question.answers[_ansId].isValid == true);   // It means this answer belongs to this question 

        Answer memory answer = question.answers[_ansId];  

        require(answer.author == msg.sender);

        answer.ans_hash = _hash;  
        answer.lastModificationTimestamp = uint64(now);

        question.answers[_ansId]=answer; 

    }

    function getTrendingAnswersLength() public constant returns (uint){

        return allAnswers.length;

    }
    
    


}