from graphene_django import DjangoObjectType
import graphene
from .models import ReleaseLoan
from loan.models import Loan
from loan.schema import LoanType

class ReleaseLoanType(DjangoObjectType):
    class Meta:
        model = ReleaseLoan
        fields = "__all__"
        
class Query(graphene.ObjectType):
    releaseloans = graphene.List(ReleaseLoanType)

    def resolve_releaseloans(self, info):
        return ReleaseLoan.objects.all()
   
class UpdateReleaseLoan(graphene.Mutation):
    releaseLoans = graphene.Field(ReleaseLoanType)

    class Arguments:
        id = graphene.Int(required = True)
        s_no = graphene.Int()
        #loan= graphene.String()
        amt_collected = graphene.Float()
        interest = graphene.Float()
        
    @classmethod
    def mutate( info, **kwargs):
        relLoan = ReleaseLoan.objects.get(pk=kwargs.get('id'))
        relLoan.s_no = kwargs.get('s_no')
        #relLoan.loan_no = Loan.objects.get(loan_no=kwargs.get('loan'))
        relLoan.amt_collected = kwargs.get('amt_collected')
        relLoan.interest = kwargs.get('interest')
        relLoan.save()
        # Notice we return an instance of this mutation
        return UpdateReleaseLoan(releaseLoans=relLoan)

class CreateReleaseLoan (graphene.Mutation):
    releaseLoans = graphene.Field(ReleaseLoanType)
    
    class Arguments:
        # The input arguments for this mutation
        s_no = graphene.Int()
        loan = graphene.String()
        amt_collected = graphene.Float()
        interest = graphene.Float()


    def mutate(self, info, **kwargs):
        loan_no = Loan.objects.get(loan_no=kwargs.get('loan'))
        releaseloans = ReleaseLoan(
            s_no=kwargs.get('s_no'), 
            loan_no=loan_no,
            amt_collected=kwargs.get('amt_collected'),
            interest=kwargs.get('interest')
            )
        releaseloans.save()
        return CreateReleaseLoan(releaseLoans=releaseloans)

    

class Mutation(graphene.ObjectType):
    create_releaseloans = CreateReleaseLoan.Field()
    update_releaseloans = UpdateReleaseLoan.Field()

