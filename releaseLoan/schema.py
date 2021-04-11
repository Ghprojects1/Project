from graphene_django import DjangoObjectType
import graphene
from .models import ReleaseLoan
from loan.models import Loan
from loan.schema import LoanType
from authentication.models import User


class ReleaseLoanType(DjangoObjectType):
    class Meta:
        model = ReleaseLoan
        fields = "__all__"


class Query(graphene.ObjectType):
    allreleaseloans = graphene.List(ReleaseLoanType)
    search_releaseloan = graphene.List(
        ReleaseLoanType, loan_no=graphene.String(required=True))

    def resolve_allreleaseloans(self, info):
        return ReleaseLoan.objects.all()

    def resolve_search_releaseloan(self, info, loan_no):
        loan = Loan.objects.get(loan_no=loan_no)
        return ReleaseLoan.objects.filter(loan_no=loan)


class UpdateReleaseLoan(graphene.Mutation):
    releaseLoans = graphene.Field(ReleaseLoanType)

    class Arguments:
        id = graphene.Int(required=True)
        s_no = graphene.Int()
        #loan= graphene.String()
        amt_collected = graphene.Float()
        interest = graphene.Float()

    @classmethod
    def mutate(info, **kwargs):
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
        loan_no = graphene.String()
        amt_collected = graphene.Float()
        interest = graphene.Float()

    def mutate(self, info, **kwargs):
        loan = Loan.objects.get(loan_no=kwargs.get('loan_no'))
        releaseloans = ReleaseLoan(
            s_no=kwargs.get('s_no'),
            loan=loan,
            amt_collected=kwargs.get('amt_collected'),
            interest=kwargs.get('interest')
        )
        releaseloans.save()
        return CreateReleaseLoan(releaseLoans=releaseloans)


class Mutation(graphene.ObjectType):
    create_releaseloans = CreateReleaseLoan.Field()
    update_releaseloans = UpdateReleaseLoan.Field()
