
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


/*
 * GET login page.
 */

exports.login = function(req, res, next) {
  res.render('login');
};

/*
 * GET logout route.
 */

exports.logout = function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
};


/*
 * POST authenticate route.
 */

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password)
    return res.render('login', {error: "Please enter your email and password."});
console.log(req.body.email);
  req.collections.users.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(error, user){
	  var continueFlow = false;
	  console.log(user);
	  console.log(!user);
    if (error) return next(error);
    if (!user){ 
	
	var jsonObj = require("./db/users.json");
	var obj;
	console.log(req.body.email);
	for ( var i = 0; i < jsonObj.length; i++ ) {
		console.log("key: "+jsonObj[i]["email"]+" value: "+jsonObj[i]["password"]);
		if(req.body.email === jsonObj[i]["email"].toString() && req.body.password === jsonObj[i]["password"].toString())
		{	
			continueFlow = true;
			obj = jsonObj[i];
		}
	}
	console.log(!continueFlow);
	if(!continueFlow)
		return res.render('login', {error: "Incorrect email&password combination."});
	}
	console.log(obj.email);
	
    req.session.user = obj.email;
    req.session.admin = obj.admin;
	req.session.loggedin = true;
    res.redirect('/admin');
  })
};
