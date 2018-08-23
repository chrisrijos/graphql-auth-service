const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const { verifyJwt } = require('../../utils');

const user = require('../../models/user');
const UsersType = require('../types/users');

const VisitedInputType = new GraphQLInputObjectType({
  name: 'VisitedInput',
  fields: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    place: { type: GraphQLNonNull(GraphQLString) }
  }
});

module.exports = {
  type: UsersType,
  description: 'This mutation will add a new visited place',
  args: {
    input: { type: new GraphQLNonNull(VisitedInputType) }
  },
  resolve: async (obj, { input }, { pgPool, req }) => {
    await verifyJwt(req)
    await user(pgPool).addNewVisitedPlace(input)
    return user(pgPool).getUserById(input.userId)
  }
}