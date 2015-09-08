//CALL PACKAGES
var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');


// SUPER SECRET FOR CREATING TOKENS
var superSecret = config.secret;



module.exports = function(app, express) {

var apiRouter = express.Router();



// ROUTE TO AUTHENTICATE A USER (POST http://localhost:8080/api/authenticate)
    apiRouter.post('/authenticate', function(req, res) {

//FIND THE USER
        User.findOne({
            username: req.body.username
        }).select('name username email password').exec(function(err, user) {

            if (err) throw err;

//NO USER WITH THAT USERNAME WAS FOUND
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

//CHECKS IF PASSWORD MATCHES
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

//CREATE TOKEN IF USER IS FOUND AND PASSWORD IS RIGHT
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

//RETURN THE INFORMATION INCLUDUNG TOKEN AS JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });



//ROUTE MIDDLEWARE TO VERIFY TOKEN
    apiRouter.use(function(req, res, next) {

// DO LOGGING
        console.log('Somebody just came to our app!');

//CHECKS HEADER OR URL PARAMETERS OR POST PARAMETERS FOR TOKEN
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

//DECODE TOKEN
        if (token) {

//VERIFIES SECRET AND CHECKS EXPIRATION
            jwt.verify(token, superSecret, function(err, decoded) {

                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {

//IF EVERYTHING IS GOOD, SAVE REQUEST FOR USE IN OTHER ROUTES
                    req.decoded = decoded;

//MAKE SURE WE GO TO NEXT ROUTES AND DO NOT STOP HERE
                    next();
                }
            });

        } else {

//IF THERE IS NO TOKEN, RETURN HTTP 403 RESPONSE(ACCESS FORBIDDEN) AND ERROR MESSAGE
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });



// TEST THE ROUTE TO MAKE SURE EVERYTHING IS WORKING
// accessed at GET http://localhost:8080/api
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'HELLO! Welcome to our api!' });
    });




// ON ROUTES THAT END IN /users
    apiRouter.route('/users')

// CREATE A USER (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

// CREATE A NEW INSTANCE OF THE USER MODEL
            var user = new User();

// SET THE USERS NAME - COMES FROM THE REQUEST
            user.name = req.body.name;

// SET THE USERS USERNAME - COMES FROM THE REQUEST
            user.username = req.body.username;

// SET THE USERS EMAIL - COMES FROM THE REQUEST
            user.email = req.body.email;

// SET THE USERS PASSWORD - COMES FROM THE REQUEST
            user.password = req.body.password;


            user.save(function(err) {
                if (err) {

// ERROR MESSAGE IF DUPLICATE ENTRY
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. '});
                    else
                        return res.send(err);
                }

// RETURN MESSAGE WHEN USER CREATED
                res.json({ message: 'User created!' });
            });
        })

// GET ALL THE USERS (accessed at GET http://localhost:8080/api/users)
        .get(function(req, res) {
            User.find({}, function(err, users) {
                if (err) res.send(err);

//RETURN THE USERS
                res.json(users);
            });
        });



// ON ROUTES THAT END IN  /users/:user_id
    // ----------------------------------------------------
    apiRouter.route('/users/:user_id')


// GET SPECIFIC USER WITH THAT ID
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);

// RETURN THAT USER
                res.json(user);
            });
        })


// UPDATE USER WITH THAT ID
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

// SET THE NEW USER INFORMATION IF IT EXISTS IN THE REQUEST
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;

// SAVE THE USER
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })



// DELETE A USER WITH THIS ID
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });



//API ENDPOINT TO GET USER INFORMATION
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};
