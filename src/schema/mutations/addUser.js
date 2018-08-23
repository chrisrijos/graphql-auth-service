const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const user = require('../../models/user')
const MeType = require('../types/me')

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    email: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  }
});

module.exports = {
  type: MeType,
  description: 'This mutation will create a new user and it will return a apiKey',
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve: async (obj, { input }, { pgPool }) => {
    return user(pgPool).addNewUser(input)
  }
}