require("dotenv").config();
var express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const GithubStrategy = require("passport-github").Strategy;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());


//This function is used to check that each API request has a valid JWT
const checkAuthorization = function (req, res, next) {

    // 1. See if there is a token on the request...if not, reject immediately
    //
    // console.log(req.cookies);
    console.log(req.cookies.permissionGranted);
    const userJWT = req.cookies.permissionGranted;
    if (!userJWT) {
        res.send(401, 'Invalid or missing authorization token')
    } else {
        try {
            const userJWTPayload = jwt.verify(userJWT, "AlphaRomeo8567");
            if (!userJWTPayload) {
            //Kill the token since it is invalid
            //
            // res.clearCookie('twitterAccessJwt')
                res.send(401, 'Invalid or missing authorization token')
            }
        } catch (err) {
            console.log(err);
            res.redirect("/");
        }
    }
    //AlphaRomeo used for testing/placeholder this will be changed to an environment variable
    jwt.verify(userJWT, "AlphaRomeo8567", (err, decoded) => {
        if (err) throw err;
        console.log(decoded);
    });
    console.log("Test passed");
    next();
};


//Authentication strategy implementation and add to database
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "/auth/github/callback"
}, 
// example profile return below
// ----------------------------
// { login: 'FearMichael',
// id: 44407940,
// node_id: 'MDQ6VXNlcjQ0NDA3OTQw',
// avatar_url: 'https://avatars3.githubusercontent.com/u/44407940?v=4',
// gravatar_id: '',
// url: 'https://api.github.com/users/FearMichael',
// html_url: 'https://github.com/FearMichael',
// followers_url: 'https://api.github.com/users/FearMichael/followers',
// following_url:
//  'https://api.github.com/users/FearMichael/following{/other_user}',
// gists_url: 'https://api.github.com/users/FearMichael/gists{/gist_id}',
// starred_url:
//  'https://api.github.com/users/FearMichael/starred{/owner}{/repo}',
// subscriptions_url: 'https://api.github.com/users/FearMichael/subscriptions',
// organizations_url: 'https://api.github.com/users/FearMichael/orgs',
// repos_url: 'https://api.github.com/users/FearMichael/repos',
// events_url: 'https://api.github.com/users/FearMichael/events{/privacy}',
// received_events_url: 'https://api.github.com/users/FearMichael/received_events',
// type: 'User',
// site_admin: false,
// name: 'Michael Fearnley',
// company: null,
// blog: '',
// location: 'New Hampshire',
// email: 'mtfear@hotmail.com',
// hireable: null,
// bio: 'Full Stack Web Developer',
// public_repos: 26,
// public_gists: 0,
// followers: 10,
// following: 10,
// created_at: '2018-10-23T15:25:38Z',
// updated_at: '2019-05-06T20:15:53Z' }
// ----------------------------

function(accessToken, refreshToken, profile) {
    if (accessToken) {

        // add or find user in database
            // this can be done here or at the /authenticate route, JWT needs to be assigned at JWT route

    } else {
        return false;
    }
}));

app.get("/auth/github",
    passport.authenticate("github"));

app.get("/authenticate", passport.authenticate("github", { failureRedirect: "/", session: false }), function(req, res) {
    
    console.log("user");
    console.log(req.authInfo);
    console.log("user");

    if (req.authInfo) {
        payload = {
            email: req.authInfo.email,
            superuser: false,
        };
        let privateKey = "AlphaRomeo8567"; // eventually an environment variable
        let token = jwt.sign(payload, privateKey, { expiresIn: "1m"});
        let cookieOptions = {
            httpOnly: true
        };
        res.cookie("permissionGranted", token, cookieOptions);
    };
    res.redirect("/");
});