var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//secret key (use any big text)
var secretKey = "MySuperSecretKey";

//Database in the cloud
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:123456@ds043972.mongolab.com:43972/blog', function (err) {
    if (err) { console.error("error! " + err) }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load mongodb model schema
var Post = require('./model/post');
var User = require('./model/user');

//create a REST ROUTER
var router = express.Router();

app.use('/', express.static(__dirname+'/'));

//middleware: run in all requests
router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
                   " with " + JSON.stringify(req.body));
    next();
});

//middleware: auth
var auth = function (req, res, next) {
    var token = req.body.token || req.query.token
                      || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                                success: false,
                                message: 'Access denied'
                            });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'Access denied'
        });
    }
}

//simple GET / test
router.get('/', function (req, res) {
    res.json({ message: 'hello world!' });
});

router.route('/users')
    .get(auth, function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
    .post(function (req, res) {
        var user = new User();
        user.name = req.body.name;
        user.login = req.body.login;
        user.password = req.body.password;

        user.save(function (err) {
            if (err)
                res.send(err);
            res.json(user);
        })
    });

    router.route('/login').post(function (req, res) {
    if (req.body.isNew) {
        User.findOne({ login: req.body.login }, 'name')
            .exec(function (err, user) {
                if (err) res.send(err);
                if (user != null) {
                    res.status(400).send('Login Existente');
                }
                else {
                    var newUser = new User();
                    newUser.name = req.body.name;
                    newUser.login = req.body.login;
                    newUser.password = req.body.password;
                    newUser.save(function (err) {
                        if (err) res.send(err);
                        var token = jwt.sign(newUser, secretKey, {
                            expiresIn: "1 day"
                        });
                        res.json({ user: newUser, token: token });
                    });
                }
            });
    } else {
        User.findOne({ login: req.body.login,
                password: req.body.password }, 'name')
            .exec(function (err, user) {
                if (err) res.send(err);
                if (user != null) {
                    var token = jwt.sign(user, secretKey, {
                        expiresIn: "1 day"
                    });
                    res.json({ user: user, token: token });
                }else{
                    res.status(400).send('Login/Senha incorretos');
                }
            });
    }
});

router.route('/posts/:post_id?')
    .get(function (req, res) {
        Post
            .find()
            .sort([['date', 'descending']])
            .populate('user', 'name')
            .exec(function (err, posts) {
                if (err)
                    res.send(err);
                res.json(posts);
            });
    })
    .post(auth, function (req, res) {
        var post = new Post();
        post.title = req.body.title;
        post.text = req.body.text;
        post.user = req.body.user._id;
        if (post.title==null)
            res.status(400).send('Título não pode ser nulo');
        post.save(function (err) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })
    .delete(auth, function (req, res) {
       Post.remove({
            _id: req.params.post_id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

//register router
app.use('/api', router);
//start server
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);

