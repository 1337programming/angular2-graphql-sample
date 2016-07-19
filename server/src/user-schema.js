import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

// In memory data store
const UserStore = [
  {
    'name': 'Patrick',
    'email': 'patrick@1337programming.com',
    'age': 103,
    'score': 50.2
  },
  {
    'name': 'Tom',
    'email': 'tom@1337programming.com',
    'age': 103,
    'score': 89.2
  },
];

// Root level queries
const UserQuery = new GraphQLObjectType({
  name: 'UserQuery',
  fields: () => ({
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt},
    score: {type: GraphQLFloat}
  })
});

// Mutations @TODO
const UserMutations = new GraphQLObjectType({
  name: 'UserMutations',
  fields: () => ({
    addUser: {
      type: GraphQLString,
      description: 'Add a new user',
      args: {
        item: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {item}) {
        if(UserStore.length >= 10) {
          // Remove the third time by keeping the first two
          UserStore.splice(2, 1);
        }

        UserStore.push(item);
        return item;
      }
    }
  })
});

// Schema
export const UserSchema = new GraphQLSchema({
  name: 'UserSchema',
  query: UserQuery,
  mutation: UserMutations
});
