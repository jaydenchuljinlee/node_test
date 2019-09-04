module.exports = function(app, fs)
{
     app.get('/',function(req,res){
        var sess = req.session;

         res.render('index', {
             title: "MY HOMEPAGE",
             length: 5,
             name : sess.name,
             username : sess.username
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
            res.json(result);
            return;
        }

        //load data & check dupolication
        fs.readFile(__dirname + "/../data/"+"user.json","utf8",function(err,data) {
           var users = JSON.parse(data);
           if (users[username]) {
               //duplication found
               reuslt["success"] = 0;
               result["error"] = "duplicate";
               res.json(result);
               return;
           }

           //add to data
           users[username] = req.body;

           //save data
           fs.writeFile(__dirname + "/../data/"+"user.json"
            ,JSON.stringify(users,null,'\t'),'utf8',function(err,data) {
                result["success"] = 1;
                res.json(result);
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
                res.json(reuslt);
                return; 
            }

            delete users[req.params.username];
            fs.writeFile(__dirname+"/../data/user.json"
                ,JSON.stringify(users,null,'\t'),'utf8',function(err,data) {
                    result["success"] = 1;
                    res.json(result);
                    return;
            })
        })
     })

     app.get("/login/:username/:password",function(req,res) {
        var sess;
        sess = req.session;

        fs.readFile(__dirname+"/../data/user.json","utf8",function(err,data) {
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;

            var result = {};
            console.log(users[username]);
            //username not found
            if(!users[username]) {
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password) {
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);

            } else {
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        })
     })

     app.get("/logout",function(req,res) {
        sess = req.session;

        if (sess.username) {
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect("/");
                }
            })
        }
     })
}