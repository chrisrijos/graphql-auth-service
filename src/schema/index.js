const { GraphQLSchema, GraphQLObjectType } = require('graphql')

// Import queries
const GetUser = require('./queries/getUser')
const Login = require('./queries/login')

// Import mutations
const AddNewUserMutation = require('./mutations/addUser')
const AddVisitedPlaceMutation = require('./mutations/addVisitedPlaces')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    user: GetUser,
    login: Login
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser: AddNewUserMutation,
    AddVisitedPlace: AddVisitedPlaceMutation
  })
})

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = ncSchema