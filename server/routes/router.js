const Express = require('express');

const auth = require('./authentication');

let router = Express.Router();

module.exports = (db) => {

    // router.use((req, res, next) => {
    //     db.User.findOne({
    //         where: {
    //             email: req.email
    //         },
    //         include: [ Role ]
                        
    //     }).then(result => {
    //         req.role = result.role;
    //         next();
    //     });
    // });

    router.get('/api/private-scoped', auth.checkJwt, auth.checkScopes, function(req, res) {
        res.json({
            message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
        });
    });
    
    router.post('/api/semi-private', function(req, res) {
        console.log(req.body);
            res.send({message: "Semi-private endpoint reached!"});
    });

    router.post('/api/newUser', (req, res) => {
        db.User.create(req.body).then(result => res.send(result));
    });

    return router;
    
}