const { GraphQLID, GraphQLNonNull } = require('graphql')


const UserType = require('../types/users')
const user = require('../../models/user')

module.exports = {
  type: UserType,
  description: 'This query will search for a user with a specific userId',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (obj, { userId }, { pgPool }) {
    return user(pgPool).getUserById(userId)
  }
}