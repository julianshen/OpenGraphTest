require.paths.unshift(__dirname + '/lib');

var express   = require('express');

var ramen = [ 
   {name:'一蘭拉麵', image:'270071_2126080868134_1129283437_2525225_6312122_n'},
   {name:'河童本鋪', image:'259910_2093605536271_1129283437_2519784_5553786_n'}];
 

// create an express webserver
var app = express.createServer(
  express.logger(),
  express.static(__dirname + '/public'),
  express.cookieParser(),
  // set this to a secret value to encrypt session cookies
  express.session({ secret: process.env.SESSION_SECRET || 'secret123' })
);

// listen to the PORT given to us in the environment
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get('/', function(request, response) {
    response.render('index.ejs', {
        layout: false,
        app_id: process.env.FACEBOOK_APP_ID || 'abcd',
        ramen: ramen
    });
});

app.get('/ramen/:id([0-9]+)', function(req, res){
    var method = req.headers['x-forwarded-proto'] || 'http';
    var base_path = method + '://' + req.headers.host;
    var id = req.params.id;
    
    if(id) {
    	res.render('men.ejs', {
        	layout: false,
        	app_id: process.env.FACEBOOK_APP_ID || 'abcd',
        	ramen: ramen,
        	menid:id,
        	basepath:base_path
    	});
    } else {
        next();
    }
});

