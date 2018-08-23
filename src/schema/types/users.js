const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const { verifyJwt } = require('../../utils')
const user = require('../../models/user')

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => {
    const PlacesType = require('./places')
    return {
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
      visitedPlaces: {
        type: new GraphQLList(PlacesType),
        resolve: async (obj, args, { pgPool, req }) => {
          try {
            await verifyJwt(req)
            return user(pgPool).getVisitedPlaces(obj.id)
          } catch (err) {
            return []
          }
        }
      }
    }
  }
})

module.exports = UsersType;