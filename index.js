const http = require('http');
const {Projects}=require('./data-store');

const server = http.createServer((req, res) => {
  const url = req.url;

  let urlArray=url.split('/');
  const rootPath=urlArray[1];
  
  if (rootPath==='projects'  && (!urlArray[0]) && (urlArray.length <= 3)) {
    const result=urlArray[2].match(/\D/g);
    const id=urlArray[2].match(/\d/g);
    if (!result && (id)) {
      const projectId=parseInt(urlArray[2]);
      let projectsArray=Projects.filter((proj)=>{
                                  if (proj.projectId===projectId) {
                                    return proj;
                                  }
                                });
      if (projectsArray[0]) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(projectsArray[0]));
      }
      else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message:"No matching product found"}));
      }
      
    }
    else{
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: "BAD REQUEST"}));
    }
  }
  else{
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message:"Invalid Path"}));
  }


});

server.listen(8000);
