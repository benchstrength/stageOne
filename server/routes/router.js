const Express = require('express');

const auth = require('./authentication');

let router = Express.Router();

module.exports = (db) => {

    const Op = db.Sequelize.Op;
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

    router.post('/api/graph', (req, res) => {
        db.Skill.findAll({
            include: [{
                model: db.User,
            }]
        }).then(result => {
            res.json(result);
        });
    });


    // takes an object with skills property assigned array of Skills names (String)
    // returns only users with each of the required skills
    router.post('/api/usersBySkill', (req, res) => {
        db.User.findAll({
            include: [{
                model: db.Skill,
                where: {
                    name: {
                        [Op.or]: req.body.skills
                    }
                }
            }]
        }).then(response => res.json(response.filter(user => user.Skills.length === req.body.skills.length)));
    });

    router.post('/api/getallusers', (req, res) => {
        db.User.findAll({
            include: [{
                model: db.Skill
            }]
        }).then(result => {
            res.json(result)
        });
    });
    
    router.post('/api/semi-private', function(req, res) {
        console.log(req.body);
            res.json({message: "Semi-private endpoint reached!"});
    });

    router.post('/api/newUser', (req, res) => {
        db.User.create(req.body).then(result => res.send(result));
    });

    router.post ('/api/add-skill', function (req, res) {
            res.json({message: "Add Skill endpoint reached!"});
    });

    router.post('/api/getoneuser', (req, res) => {
        db.User.findOne({
            where: {email: req.body.email},
            include: [{
                model: db.Skill
            }]
        }).then(result => res.json(result));
    });

    return router;
    
}