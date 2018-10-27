const resolvers = {
  Query: {
    message (_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      // return only the authenticated user todos
      return user.sub
    }
  }
}

module.exports = resolvers