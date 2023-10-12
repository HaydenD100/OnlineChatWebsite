//Chat Webserver v1.0.0
//This is the nodejs file that runs the Webserver that takes httprequests and outputs the information onto the http page.
//All messages are saved in a text file called chats.txt
//HaydenD100 Github:https://github.com/HaydenD100
//Date:2023-10-12



const http = require("http");
const host = 'localhost';
const port = 8000;
let indexFile;

//File System
const fs = require('fs').promises;
//Http request listner 
const requestListener = function (req, res) {
    //displays the request used for debugging
    console.log(req.url)
    


    
    //Checks to see if the http request has the send command 
    if(req.url.substr(0,5) == "/send")
    {
        const fs = require('fs'); 

        //get the name of the user who sent the request
        var namePos = req.url.search("name:")
        var name = decodeURI(req.url.substr(namePos + 5));
        if(name == "") name = "anonymous"
        
        

        //read the chats file 
        fs.readFile('chats.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        //add the message to chat file
        fs.appendFile("chats.txt", "\n" + name + ":"+ decodeURI(req.url.substr(5,namePos- 5)), (err) => { 
            if (err) 
              console.log(err); 
          }); 
        
        
       
        //Update the html page
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end("<html><body><pre>" + data +"\n" + name + ":"+  decodeURI(req.url.substr(5,namePos - 5)) +"<pre></body></html>");
        
    });

    }
    //if the html request has the load command this is used when the webpage is firstloaded and when you press the refresh message button
    else if(req.url.substr(0,5) == "/load")
    {
        const fs = require('fs'); 
        fs.readFile('chats.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end("<html><body><pre>" + data +"\n" + decodeURI(req.url.substr(5)) +"<pre></body></html>");
        
    });
    }

    
    //if the command isnt for load or send its for requesting the index page
    else
    {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFile);
    }
};

//Starts the server and listens on speficed port
const server = http.createServer(requestListener);
fs.readFile(__dirname + "/index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });
