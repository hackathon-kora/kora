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
        abi=JSON.parse('[ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "answers", "outputs": [ { "name": "user", "type": "address" }, { "name": "hash", "type": "string" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberAnswers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_hash", "type": "string" } ], "name": "writeAnswer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_author", "type": "address" }, { "indexed": false, "name": "_hash", "type": "string" }, { "indexed": false, "name": "_timestamp", "type": "uint256" } ], "name": "AnswerCreated", "type": "event" } ]');
        var dummyContract=web3.eth.contract(abi);
        var dummyInstance=dummyContract.at("0x142A279eeB963f935a956Ad819F541F5B6f821A0");
        window.dummyInstance = dummyInstance;
    }
});

$('document').ready(function() {
    var qid = new URL(window.location.href).searchParams.get('q');
    if(qid===null) {
        $('body').css('background-color', 'rgb(62, 35, 100)');
        $('.error').css('display', 'block');
        $('#divJugad').css('display', 'none');
        $('.error > h1').text("OOPS");
        $('.error > h3').text("Something went wrong.");
    }
    $('#answer-link').attr('href', '../answer.html?q='+qid);
    
    
    for(i=0 ; i<5 ; i++) {
        var ele = $('<div class="row">\
                                <div class="col-sm-12">\
                                    <div class="panel panel-default custom-panel">\
                                        <div class="panel-body">\
                                            <div class="media">\
                                                <img src="images/user.png" class="pull-left profile-image">\
                                                <div class="media-body">\
                                                    <h5 class="media-heading">\
                                                        Prabhav Agarwal\
                                                    </h5>\
                                                    <p class="post-time">jjjj</p>\
                                                </div>\
                                            </div>\
                                            <div class="answer">\
                                                kkk\
                                            </div>\
                                            <div class="button-line">\
                                                <div class="btn btn-success">$ 515.125</div>\
                                                <div class="btn btn-primary">Upvote | 25</div>\
                                                <div class="btn btn-primary">Downvote | 25</div>\
                                                <a href="#" class="comment">Comment</a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>');
        $('#qna').append(ele);
    }
})
