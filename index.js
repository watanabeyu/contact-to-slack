/* vars */
var https = require('https');
var url = require('url');
var slack_url = 'slack webhook url';
var slack_req_opts = url.parse(slack_url);
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type':'application/json'};

exports.handler = function(event,context,cb){
  /*  */
  var req = https.request(slack_req_opts,function(res){
    if(res.statusCode === 200){
      cb(null,{success:true});
    }
    else{
      cb(res.statusMessage);
    }
  });

  /* on error */
  req.on('error',function(e){
    cb(e.message);
  });

  /* publish */
  var text = "";
  text += "--------------------------------------------------\n";
  text += `*ユーザ名* ： ${event.name} \n`;
  text += `*メールアドレス* ： ${event.email} \n`;
  text += `*お問い合わせ内容* \n ${event.content} \n`;
  text += "\n--------------------------------------------------";

  req.write(JSON.stringify({
    username:"contact",
    text:text
  }));

  req.end();
}
