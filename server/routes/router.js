const Express = require('express');

const auth = require('./authentication');

let router = Express.Router();

module.exports = (db) => {

    const Op = db.Sequelize.Op;

    router.use((req, res, next) => {
        console.log(req.headers.permissions);
        db.User.findOne({
            where: {
                email: req.headers.permissions
            },
            include: [ db.Role ]
                        
        }).then(result => {
            if(result.dataValues) {
                req.role = result.dataValues.Role.dataValues.name;
                console.log(req.role);
            }
            next();
        });
    });

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
                    id: {
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
        db.User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isEmployee: req.body.isEmployee,
            role: req.body.role    
        }).then(user => res.json(user));
    });

    router.post ('/api/add-skill', function (req, res) {
        console.log(req.body);
        db.User.findOne({
            where: {
                email: req.body.userEmail
            }
        }).then(user => {
            db.Skill.findOne({
                where: {id: req.body.skillId}
            }).then(skill => {
                user.addSkill(skill, { through: 
                    {
                        self_rating: req.body.skillSelfRating,
                        interest: req.body.skillInterest
                    }
                }).then(response => res.json({skill, user_skill: response[0]}));
            })
            // res.json(user);
        });
        // user.adduser_skills(req.body)
        //     .then(result => res.send(result));
            //Need to get data from add skills form and use this to post to db
    });

    router.post('/api/getoneuser', (req, res) => {
        db.User.findOne({
            where: {email: req.body.email},
            include: [{
                model: db.Skill
            }]
        }).then(result => res.json(result));
    });

    /* takes object
    {
        skillId: id of skill to assign to programming areas
        areaIds: ids of programming areas to add skill to
    }
    */
    router.patch('/api/addprogrammingareastoskill', (req, res) => {

        db.Skill.findOne({
            where: { id: req.body.skillId }
        }).then( skill => {
            console.log(Object.getPrototypeOf(skill));
            db.ProgrammingArea.findAll({
                where: { 
                    id: {
                        [Op.or]: req.body.areaIds 
                    }
                }
            }).then( programmingAreas => {
                skill.addProgrammingAreas(programmingAreas)
                    .then(response => {
                        res.json(response);
                        return;
                    });
            });   
        });
    });

    /* takes object 
    {
        areaId: id of programming area,
        skillIds: array of skill ids to be added to referenced programming area
    }
    */
    router.patch('/api/addskillstoprogrammingarea', (req, res) => {

        db.ProgrammingArea.findOne({
            where: { id: req.body.areaId}
        }).then( programmingArea => {
            db.Skill.findAll({
                where: {
                    id: {
                        [Op.or]: req.body.skillIds
                    }
                }
            }).then( skills => {
                programmingArea.addSkills( skills )
                    .then(response => {
                        res.json(response);
                        return
                    });
            });
        });
    });

    router.get('/api/searchterms/:fragment', (req, res) => {
        db.Skill.findAll({
            where: {
                name: {
                    [Op.substring]: req.params.fragment
                }
            }
        }).then(data => res.json(data));
    });

    router.post('/api/authuser', (req, res) => {
        //add/update user here please
    });

    router.post("/api/checkperms", (req, res) => {
        db.User.findOne({
            where: {
                email: req.headers.permissions
            },
            include: [ db.Role ]
        }).then(result => {
            console.log(result.role);
            res.json({ role: result.role });
        });
    })

    return router;
    
}