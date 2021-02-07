from graphene_django import DjangoObjectType
import graphene
from .models import ReleaseLoan
from loan.models import loan


class ReleaseLoanType(DjangoObjectType):
    class Meta:
        model = ReleaseLoan
        fields = "__all__"

class LoanType(DjangoObjectType):
    class Meta:
        model = loan
        fields = ("id", "loan_amt")
        
class Query(graphene.ObjectType):
    releaseloansQuery = graphene.List(ReleaseLoanType)
    loanQuery = graphene.Field(LoanType)#, name=graphene.String(required=True))

    def resolve_releaseloansQuery(self, info):
        # We can easily optimize query count in the resolve method
        return ReleaseLoan.objects.all()

    def resolve_loanQuery(self, info):
        return loan.objects.all()
   
schema = graphene.Schema(query=Query)