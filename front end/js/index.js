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
        processor();
    }
});


function timeConverter(timestamp){
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


function processor() {
    window.dummyInstance.getTrendingAnswersLength(function(error, result){
        if(error) {
            $('body').css('background-color', 'rgb(62, 35, 100)');
            $('.error').css('display', 'block');
            $('#divJugad').css('display', 'none');
            $('.error > h1').text("OOPS");
            $('.error > h3').text("Something went wrong");
        } else {
            console.log("Length: " + result);
            for(var i=0 ; i<Number(result) ; i++) {
                window.dummyInstance.allAnswers.call(i, function(error, result){
                    if(error) throw error;
                    else {
                        window.ipfs.block.get(result[3], function(error, ques){
                            if(error) throw error;
                            else {
                                window.dummyInstance.getUserName(result[0], function(error, username){
                                    if(error) throw error;
                                    else {
                                        var showTime = timeConverter(result[5]);
                                        var usrImg = "user" + ((i%3)+1).toString() + ".png";
                                        window.ipfs.block.get(result[9], function(error, ans){
                                           if(error) throw error;
                                            else {
                                                var moti = "Moti " + result[4].toString();
                                                var upvotes = result[1].toString();
                                                var downvotes = result[2].toString();
                                                var queId = result[3];
                                                addElement(ques, usrImg, username, showTime, ans, moti, upvotes, downvotes, queId);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}
                        

function addElement(ques, usrImg, username, showTime, ans, moti, upvotes, downvotes, queId) {
    var ele = $('<div class="row">\
                    <div class="col-sm-12">\
                        <div class="panel panel-default custom-panel">\
                            <div class="panel-body">\
                                <div class="question">'+ ques +'</div>\
                                <div class="media">\
                                    <img src="images/'+ usrImg +'" class="pull-left profile-image">\
                                    <div class="media-body">\
                                        <h5 class="media-heading">'+ username +'</h5>\
                                        <p class="post-time">'+ showTime +'</p>\
                                    </div>\
                                </div>\
                                <a href="./question.html?q='+ queId +'"><div class="answer">'+ ans +'</div></a>\
                                <div class="button-line">\
                                    <div class="btn btn-success">'+ moti +'</div>\
                                    <div class="btn btn-primary" id="up'+ queId +'" onclick="voting('+ queId +', '+ ansId +', 3)">Upvote | '+ upvotes +'</div>\
                                    <div class="btn btn-primary" id="down'+ queId +'" onclick="voting('+ queId +', '+ ansId +', 4)">Downvote | '+ downvotes +'</div>\
                                    <a href="#" class="comment">Comment</a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
    $('#trending').append(ele);  
}


function voting(quesId, ansId, reaction) {
    if(reaction == 3)
        $('#up'+quesId).val(Number($('#up'+quesId).val)+1);
    else
        $('#down'+quesId).val(Number($('#down'+quesId).val)+1);
    window.dummyInstance.NoteReactionAns(quesId, ansId, reaction, function(error, result) {
            if(error){
                if(reaction == 3)
                    $('#up'+quesId).val(Number($('#up'+quesId).val)-1);
                else
                    $('#down'+quesId).val(Number($('#down'+quesId).val)-1);
                toastr.error("Something went wrong");
            }
     });
}