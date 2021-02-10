from graphene_django import DjangoObjectType
import graphene
from .models import Loan
from authentication.models import User


class LoanType(DjangoObjectType):
    class Meta:
        model = Loan
        fields = "__all__"
        
class Query(graphene.ObjectType):
    loans = graphene.List(LoanType)#, name=graphene.String(required=True))

    def resolve_loans(self, info):
        return Loan.objects.all()

class CreateLoan (graphene.Mutation):
    loans = graphene.Field(LoanType)

    class Arguments:
        # The input arguments for this mutation
        loan_no= graphene.String(required = True)
        loan_amt = graphene.Float()
        totalDue = graphene.Float()
        itemList = graphene.String()
        status = graphene.Boolean()
        misc_charges = graphene.Float()
        gross_wt = graphene.Float()
        net_wt = graphene.Float()
        username = graphene.String()
        loan_date= graphene.Date()

    def mutate(self, info, **kwargs):
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
            loan_date=kwargs.get('loan_date')
        )
        loans.save()
        return CreateLoan(loans=loans)
         

    #update_releaseloans = UpdateReleaseLoan.Field()
##Update Loan

class UpdateLoan (graphene.Mutation):
    loans = graphene.Field(LoanType)

    class Arguments:
        # The input arguments for this mutation
        loan_no= graphene.String(required = True)
        loan_amt = graphene.Float()
        totalDue = graphene.Float()
        itemList = graphene.String()
        status = graphene.String()
        misc_charges = graphene.Float()
        gross_wt = graphene.Float()
        net_wt = graphene.Float()
        username = graphene.String()
        loan_date= graphene.Date()

    def mutate(self, info, **kwargs):
        updateLoan = Loan.objects.get(loan_no=kwargs.get('loan_no'))
    #    updateLoan.loan_amt=kwargs.get('loan_amt'), 
     #   updateLoan.totalDue=kwargs.get('totalDue'),
     #   updateLoan.itemList=kwargs.get('itemList'), 
        updateLoan.status=kwargs.get('status'),
       # updateLoan.misc_charges=kwargs.get('misc_charges'),
     #  updateLoan.gross_wt=kwargs.get('gross_wt'), 
      #  updateLoan.net_wt=kwargs.get('net_wt'),
       # updateLoan.user=User.objects.get(username=kwargs.get('username')),
      #  updateLoan.loan_date=kwargs.get('loan_date')
        updateLoan.save()
        return updateLoan(loans=updateLoan)
         
class Mutation(graphene.ObjectType):
    create_loans = CreateLoan.Field()
    update_loans = UpdateLoan.Field()

'''   
class UpdateReleaseLoan(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        s_no = graphene.String()
        #loan_no= graphene.String()
        amt_collected = graphene.Float()
        interest = graphene.Float()
        
    # The class attributes define the response of the mutation
    releaseloans = graphene.Field(ReleaseLoanType)

    @classmethod
    def mutate(cls, root, info, s_no,loan_no,amt_collected,interest,id):
        releaseloans = ReleaseLoan.objects.get(pk=id)
        releaseloans.s_no = s_no
        releaseloans.loan_no = loan_no
        releaseloans.amt_collected = amt_collected
        releaseloans.interest = interest
        releaseloans.save()
        # Notice we return an instance of this mutation
        return UpdateReleaseLoan(releaseloans=releaseloans)
'''