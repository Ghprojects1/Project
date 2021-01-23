from django.shortcuts import render
from .forms import LoanForm

# Create your views here.
def loan(request):
    if request.method == "POST":
        form = LoanForm()
        return render(request, 'loan/newLoanSuccess.html', {'form': form})
    else:
        #return render(request, 'authentication/register.html')
        form = LoanForm()
        return render(request, 'loan/newLoan.html', {'form': form})