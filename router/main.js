module.exports = function(app, fs)
{
     app.get('/',function(req,res){
         res.render('index', {
             title: "MY HOMEPAGE",
             length: 5
         })
     });

     app.get('/list',function(req,res) {
        fs.readFile(__dirname + "/../data/"+"user.json","utf8",function(err,data) {
            console.log(data);
            res.end(data);
        })
     });

     app.get('/getUser/:username',function(req,res) {
        var result = {};
        var username = req.params.username;

        //check req validity
        if(!req.body["password"] || !req.body["name"]) {
            result["success"] = 0;
            result["error"] = "invalid request";
            res.JSON(result);
            return;
        }

        //load data & check dupolication
        fs.readFile(__dirname + "/../data/"+"user.json","utf8",function(err,data) {
           var users = JSON.parse(data);
           if (users[username]) {
               //duplication found
               reuslt["success"] = 0;
               result["error"] = "duplicate";
               res.JSON(result);
               return;
           }

           //add to data
           users[username] = req.body;

           //save data
           fs.writeFile(__dirname + "/../data/"+"user.json"
            ,JSON.stringify(users,null,'\t'),'utf8',function(err,data) {
                result["success"] = 1;
                res.JSON(result);
            })
        })
     });

     app.delete('/deleteUser/"username',function(req,res) {
         var result = {};
        // load data
        fs.readFile(__dirname+"/../data/user.json","utf8",function(err,data) {
            var users = JSON.parse(data);

            //if not found
            if (!users[req.params.username]) {
                result["success"] = 0;
                result["error"]= "not found";
                res.JSON(reuslt);
                return; 
            }

            delete users[req.params.username];
            fs.writeFile(__dirname+"/../data/user.json"
                ,JSON.stringify(users,null,'\t'),'utf8',function(err,data) {
                    result["success"] = 1;
                    res.JSON(result);
                    return;
            })
        })
     })
}