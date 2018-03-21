window.addEventListener('load', function() {
    if(typeof web3 === 'undefined') {
        $('body').css('background-color', 'rgb(62, 35, 100)');
        $('.error').css('display', 'block');
        $('#divJugad').css('display', 'none');
        $('.error > h1').text("No web3");
        $('.error > h3').text("Please install metamask to continue");
    } else if(web3.eth.accounts.length === 0) {
        $('body').css('background-color', 'rgb(62, 35, 100)');
        $('.error').css('display', 'block');
        $('#divJugad').css('display', 'none');
        $('.error > h1').text("no account");
        $('.error > h3').text("Please login to your metamask account");
    } else {
        web3 = new Web3(web3.currentProvider);
        abi=JSON.parse('[{"constant":false,"inputs":[{"name":"_queId","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"addAnswer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"addQuestion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint64"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint64"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_queId","type":"bytes32"}],"name":"followQuestion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"queId","type":"bytes32"},{"name":"ansId","type":"bytes32"},{"name":"reaction","type":"uint8"}],"name":"NoteReactionAns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"coinPower","type":"uint64"}],"name":"power_down","outputs":[{"name":"res","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"coins","type":"uint64"}],"name":"power_up","outputs":[{"name":"res","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint64"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint64"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint64"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint64"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_queId","type":"bytes32"},{"name":"_ansId","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"updateAnswer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_queId","type":"bytes32"},{"name":"_hash","type":"bytes32"}],"name":"updateQuestion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"userRefresh","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allAnswers","outputs":[{"name":"author","type":"address"},{"name":"upvotes","type":"uint16"},{"name":"downvotes","type":"uint16"},{"name":"coinsMade","type":"uint64"},{"name":"lastModificationTimestamp","type":"uint64"},{"name":"creationTimestamp","type":"uint64"},{"name":"vaa","type":"uint64"},{"name":"ansId","type":"bytes32"},{"name":"ans_hash","type":"bytes32"},{"name":"queId","type":"bytes32"},{"name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTrendingAnswersLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LDCR","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LDVA","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"questions","outputs":[{"name":"author","type":"address"},{"name":"followers","type":"uint32"},{"name":"coinsMade","type":"uint64"},{"name":"lastModificationTimestamp","type":"uint64"},{"name":"creationTimestamp","type":"uint64"},{"name":"queId","type":"bytes32"},{"name":"que_hash","type":"bytes32"},{"name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"questionsIndex","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCoinPower","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TVA","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"coinPower","type":"uint64"},{"name":"vau","type":"uint64"},{"name":"lastSettlementTimestamp","type":"uint64"},{"name":"coins","type":"uint64"},{"name":"ipower","type":"uint8"},{"name":"userName","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"work","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]');
        var dummyContract=web3.eth.contract(abi);
        var dummyInstance=dummyContract.at("0x7501ef246b78912a3d6da0dbf79f131c03ef6db0");
        window.dummyInstance = dummyInstance;
    }
});

$('document').ready(function() {
    $('#myform').submit(function(e) {
        e.preventDefault();
        $('.widgButtonHTML').click();
        $('.widgButtonHTML').click();  
        var ques = $('#noise').val();
            
        var ipfsHost    = '127.0.0.1',
            ipfsAPIPort = '5001',
            ipfsWebPort = '8080',
            web3Host    = 'localhost',  // I don't need this because I am connecting through metamask
            web3Port    = '8545';
        var ipfs = window.IpfsApi(ipfsHost,ipfsAPIPort);
        const buf = buffer.Buffer(ques.toString());
        
        ipfs.files.add(buf, (error, block) => {
            if(error) { throw error; }          
            console.log(block.key);
            
    
            
            var result = web3.toHex(block[0].hash).substr(2);
    var l = Math.floor((result.length + 63) / 64);
    result = utils.padRight(result, l * 64);
    var res =  new SolidityParam(result);
            console.log(res);
            
            
            
//            var hash = block.key
//            window.dummyInstance.addQuestion(bytes, {from:web3.eth.accounts[0],gas:3000000}, function(error){});
        });
        return false;
    })
});