const { 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull, 
  GraphQLObjectType, 
  GraphQLInputObjectType
} = require('graphql');

const user = require('../../models/user');
const UsersType = require('../types/users');

const UserLoginInputType = new GraphQLInputObjectType({
  name: 'UserLoginInputType',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLNonNull(GraphQLString) }
  },
});

module.exports = {
  type: UsersType,
  description: 'This query will return whether the user is authenticated or not',
  args: {
    credentials: { type: new GraphQLNonNull(UserLoginInputType) }
  }, 
  resolve (obj, {credentials}, { pgPool }) {
    return user(pgPool).login(credentials);
  }
}