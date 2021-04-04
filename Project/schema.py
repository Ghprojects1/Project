import graphene
import loan.schema
import releaseLoan.schema
import authentication.schema
import graphql_jwt


class Query(authentication.schema.Query, loan.schema.Query, releaseLoan.schema.Query, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class Mutation(authentication.schema.Mutation, loan.schema.Mutation, releaseLoan.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
