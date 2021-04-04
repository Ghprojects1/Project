from graphene_django import DjangoObjectType
import graphene
from .models import Loan
from authentication.models import User


class LoanType(DjangoObjectType):
    class Meta:
        model = Loan
        fields = "__all__"


class Query(graphene.ObjectType):
    all_loans = graphene.List(LoanType)
    search_loan = graphene.Field(
        LoanType, loan_no=graphene.String(required=True))
    search_loan_user = graphene.List(
        LoanType, username=graphene.String(required=True))

    def resolve_all_loans(self, info):
        return Loan.objects.all()

    def resolve_search_loan(self, info, loan_no):
        return Loan.objects.get(loan_no=loan_no)

    def resolve_search_loan_user(self, info, username):
        user = User.objects.get(username=username)
        return Loan.objects.filter(user=user)


class CreateLoan (graphene.Mutation):
    loans = graphene.Field(LoanType)

    class Arguments:
        # The input arguments for this mutation
        loan_no = graphene.String(required=True)
        mode = graphene.String(required=True)
        loan_amt = graphene.Float()
        totalDue = graphene.Float()
        itemList = graphene.String()
        status = graphene.Boolean()
        misc_charges = graphene.Float()
        gross_wt = graphene.Float()
        net_wt = graphene.Float()
        username = graphene.String(required=True)
        loan_date = graphene.Date()

    def mutate(self, info, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Not Logged in')

        if kwargs.get('mode') == 'C':
            loans = Loan(
                loan_amt=kwargs.get('loan_amt'),
                loan_no=kwargs.get('loan_no'),
                totalDue=kwargs.get('totalDue'),
                itemList=kwargs.get('itemList'),
                status=kwargs.get('status'),
                misc_charges=kwargs.get('misc_charges'),
                gross_wt=kwargs.get('gross_wt'),
                net_wt=kwargs.get('net_wt'),
                user=User.objects.get(username=kwargs.get('username')),
                # loan_date=kwargs.get('loan_date')
            )
            loans.save()

        elif kwargs.get('mode') == 'U':
            loans = Loan.objects.get(loan_no=kwargs.get('loan_no'))
            loans.totalDue = kwargs.get('totalDue', loans.totalDue)
            loans.loan_amt = kwargs.get('loan_amt', loans.loan_amt)
            loans.itemList = kwargs.get('itemList', loans.itemList)
        #    if kwargs.get('status') is 'true':
        #        loans.status=True,
        #    else:
        #        loans.status=False,
            loans.misc_charges = kwargs.get('misc_charges', loans.misc_charges)
            loans.gross_wt = kwargs.get('gross_wt', loans.gross_wt)
            loans.net_wt = kwargs.get('net_wt', loans.net_wt)
            loans.user = User.objects.get(
                username=kwargs.get('username', loans.user.username))
            # loans.loan_date=kwargs.get('loan_date',loans.loan_date)
            loans.save()

        return CreateLoan(loans=loans)


class DeleteLoan (graphene.Mutation):
    loan_no = graphene.String()

    class Arguments:
        # The input arguments for this mutation
        loan_no = graphene.String(required=True)

    def mutate(self, info, loan_no):
        loans = Loan.objects.get(loan_no=loan_no)
        loans.delete()
        return DeleteLoan(loan_no=loan_no)


class Mutation(graphene.ObjectType):
    create_loans = CreateLoan.Field()
    delete_loans = DeleteLoan.Field()
