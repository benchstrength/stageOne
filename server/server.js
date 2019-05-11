var express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://bench-strength.auth0.com/.well-known/jwks.json'
}),
audience: 'benchstrengthapi',
issuer: 'https://bench-strength.auth0.com/',
algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/private-scoped', jwtCheck, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.post('/api/semi-private', function(req, res) {
  console.log(req.body);
    res.send({message: "Semi-private endpoint reached!"});
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

app.listen(PORT, function() {
    console.log(`App listening on Port ${PORT}`);
});
