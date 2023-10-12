const http = require("http");
const host = 'localhost';
const port = 8000;
let indexFile;


const fs = require('fs').promises;

const requestListener = function (req, res) {
    console.log(req.url)

    
    
    if(req.url.substr(0,5) == "/send")
    {

        const fs = require('fs');
        var namePos = req.url.search("name:")
        var name = decodeURI(namereq.url.substr(namePos + 5));
        if(name == "") name == "anonymous"
        
        

        
        fs.readFile('chats.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.appendFile("chats.txt", "\n" + name + ":"+ decodeURI(req.url.substr(5,namePos- 5)), (err) => { 
            if (err) 
              console.log(err); 
            
          }); 
        
        
       
        
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end("<html><body><pre>" + data +"\n" + name + ":"+  decodeURI(req.url.substr(5,namePos - 5)) +"<pre></body></html>");
        
    });

    }
    
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

    
    
    else
    {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFile);
    }
};


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
