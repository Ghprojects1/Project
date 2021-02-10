import graphene
import loan.schema
import releaseLoan.schema
import authentication.schema

class Query(authentication.schema.Query,loan.schema.Query,releaseLoan.schema.Query, graphene.ObjectType):
    pass

class Mutation(authentication.schema.Mutation ,loan.schema.Mutation,releaseLoan.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)