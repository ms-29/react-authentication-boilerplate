import { makeExtendSchemaPlugin, gql } from 'graphile-utils';

const PassportLoginPlugin = makeExtendSchemaPlugin(build => ({
    typeDefs: gql`
      input RegisterInput {
        email: String!
        password: String!
      }
      type RegisterPayload {
        user: User! @pgField
      }
      input LoginInput {
        email: String!
        password: String!
      }
      type LoginPayload {
        user: User! @pgField
      }
      extend type Mutation {
        register(input: RegisterInput!): RegisterPayload
        login(input: LoginInput!): LoginPayload
      }
    `,
    resolvers: {
      Mutation: {
        async register (
          mutation,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) {
          const { email, password } = args.input;
          const { rootPgPool, login, pgClient } = context;
  
          try {
            // Call our register_user function to create new user
            const {
              rows: [user]
            } = await rootPgPool.query(
              `select users.* from auth_public.register_user (
                email => $1,
                password => $2
              ) users where not (users is null)`, [
                email, password
              ]
            );

            if(!user) {
              throw new Error("Registration Failed");
            }
  
            // Fetch the data that was requested from GraphQL, and return it
            const sql = build.pgSql;
            const [row] = await selectGraphQLResultFromTable(
              sql.fragment`auth_public.user`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(
                  sql.fragment`${tableAlias}.user_id = ${sql.value(user.user_id)}`
                );
              }
            );
  
            return {
              data: row
            };
  
          } catch(error) {
            console.log(error);
            throw new Error("Registration Failed");
          }
        },
        async login (
          mutation,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) {
          const { email, password } = args.input;
          const { rootPgPool, login, pgClient } = context;
  
          try {
            // Call our authenticate function to find out if the email/password combination exists
            const {
              rows: [user]
            } = await rootPgPool.query(
              `select users.* from auth_public.authenticate (
                email => $1,
                password => $2
              ) users where not (users is null)`, [
                email, password
              ]
            );
 
            if(!user) {
              throw new Error("Login Failed");
            }
  
             // Tell Passport.js we're logged in
             await login({
               user_id: user.user_id,
               username: user.email
             });
  
            // Tell pg we're logged in
            await pgClient.query('select set_config($1, $2, true);', [
              "jwt.claims.user_id",
              user.user_id
            ]);
  
            // Fetch the data that was requested from GraphQL, and return it
            const sql = build.pgSql;
            const [row] = await selectGraphQLResultFromTable (
              sql.fragment`auth_public.user`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(
                  sql.fragment`${tableAlias}.user_id = ${sql.value(user.user_id)}`
                );
              }
            );
  
            return {
              data: row
            };
  
          } catch(error) {
            console.log(error);
            throw new Error("Login Failed");
          }
        }
      }
    }
  }));
  
  module.exports = PassportLoginPlugin;
  