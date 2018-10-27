var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const { makeExecutableSchema } = require('graphql-tools')
const schema = require('./schema')

// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());

// auth0 middleware for token verification
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://bbread.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://bbread.com/graphql-test',
    issuer: "https://bbread.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.use('/graphql', express_graphql(req =>({
    schema,
//    rootValue: root,
    context: {
        user: req.user
    }
})));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));