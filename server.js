var express     = require('express');
var path        = require('path');
var cors        = require('cors');
var _           = require('lodash');
var rp          = require('request-promise');
var moment      = require('moment');
var spam        = require('spam-filter')();

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = {
    inbox : [
        {
            from: "mom@parents.com",
            subject: "Come home for dinner",
            message: "You better be home before the streetlights come on Mister",
            starred: true,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        },
        {
            from: "dad@parents.com",
            subject: "The game is on",
            message: "My team is beating your team. haha.",
            starred: false,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        },
        {
            from: "random@whoknows.com",
            subject: "A siberian prince needs your help",
            message: "Please send me 100 rupees",
            starred: false,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        }
    ],
    archived: [
        {
            from: "somethingImportant@test.com",
            subject: "IMPORTANT NOTICE",
            message: "Please keep this forever",
            starred: false,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        },
        {
            from: "WeUsThemInc@job.com",
            subject: "You're hired!!",
            message: "Jeremy, you got the job and we'd like to offer you a salary of $1,000,000 weekly.",
            starred: true,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        },
        {
            from: "random@whoknows.com",
            subject: "A siberian prince needs your help",
            message: "Please send me 100 rupees",
            starred: false,
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        }
    ],
    sent: [
        {
            to: "mom@parents.com",
            subject: "Come home for dinner",
            message: "I am never coming home",
            date: Date.now(),
            starred: false,
            date_pretty: moment(Date.now()).calendar()
            
        },
        {
            to: "dad@parents.com",
            subject: "The game is on",
            message: "The game isnt over until it is over.",
            date: Date.now(),
            starred: false,
            date_pretty: moment(Date.now()).calendar()
            
        },
        {
            to: "WeUsThemInc@job.com",
            subject: "You're hired!!",
            message: "I accept, thanks.",
            date: Date.now(),
            starred: false,
            date_pretty: moment(Date.now()).calendar()
            
        },
        {
            to: "random@whoknows.com",
            subject: "A siberian prince needs your help",
            message: "What's your venmo?",
            date: Date.now(),
            starred: false,
            date_pretty: moment(Date.now()).calendar()
            
        }
    ],
    spam: [
        {
            from: "spambot@spam.com",
            subject: "You're a WINNER",
            message: "You've won a grand prize. Please send me your SIN and CC info.",
            date: Date.now(),
            date_pretty: moment(Date.now()).calendar()
        }
    ]
}


io.on('connection', function(socket){
    console.log("Connection to socket established.");
    io.emit('mail', messages);
    socket.on('postMessage', function(obj){
        var isSpam = spam.isSpam(obj.message);
        obj.date = Date.now();
        obj.date_pretty = moment(Date.now()).calendar();
        console.log('is spam', isSpam);
        if(isSpam){
            messages.sent.push(obj);
            if(obj.to == 'jeremyrmurphy8@gmail.com'){ //this is to showcase recieving
                obj.from = obj.to;
                messages.spam.push(obj);
            }
        }else{
            messages.sent.push(obj);
            if(obj.to == 'jeremyrmurphy8@gmail.com'){ //this is to showcase recieving
                obj.from = obj.to;
                messages.inbox.push(obj);
            }
        }
        messages['sent']=  _.orderBy(messages['sent'], ['date'], ['desc']);
        messages['inbox']=  _.orderBy(messages['inbox'], ['date'], ['desc']);
        messages['spam']=  _.orderBy(messages['spam'], ['date'], ['desc']);

        io.emit('mail', messages);
    });

    socket.on('deleteMessage', function(obj){
        messages[obj.where].splice(obj.ind,1);
        io.emit('mail', messages);
    })
    socket.on('archiveMessage', function(obj){
        var temp = messages[obj.where][obj.ind];
        messages[obj.where].splice(obj.ind,1);
        messages['archived'].push(temp);
        messages['archived'] = _.orderBy(messages['archived'], ['date'], ['desc']);
        io.emit('mail', messages);
    })
});

app.get('/ping', function(req,res){
    res.sendStatus(200);
});

app.get('/messages', function(req,res){
    //this is where it would connect to a database and store the messages under the users email id.
    //but for this example we are faking it with data above. 
    res.send(messages);
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));

