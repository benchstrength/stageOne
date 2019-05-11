const Express = require('express');

const auth = require('./authentication');

let router = Express.Router();

router.get('/api/private-scoped', auth.checkJwt, auth.checkScopes, function(req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
    });
});
  
router.post('/api/semi-private', function(req, res) {
    console.log(req.body);
        res.send({message: "Semi-private endpoint reached!"});
});

module.exports = router;