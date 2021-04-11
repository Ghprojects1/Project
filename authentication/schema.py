import graphene
from graphene_django import DjangoObjectType
from .models import User
from loan.models import Loan


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    search_user = graphene.Field(
        UserType, username=graphene.String(required=True))
    customers = graphene.List(UserType)

    me = graphene.Field(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_customers(self, info):
        return User.objects.filter(is_staff=False)

    def resolve_search_user(self, info, username):
        return User.objects.get(username=username)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in')

        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        try:
            user = User.objects.get(username=username)
            return RuntimeError("UserName Already exists")
        except:
            user = User(username=username, email=email)
            user.email = email
            user.set_password(password)
            user.save()
            return CreateUser(user=user)


class CreateCustomer(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String()
        address1 = graphene.String(required=True)
        address2 = graphene.String()
        city = graphene.String(required=True)
        state = graphene.String(required=True)
        pincode = graphene.Int(required=True)
        #birth_date = graphene.String()
        fathers_Name = graphene.String(required=True)
        occupation = graphene.String()
        remarks = graphene.String()
        reference = graphene.String()
        avatar = graphene.String()

    def mutate(self, info, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Not Logged in')

        try:
            user = User.objects.get(username=kwargs.get('username'))
            return RuntimeError("UserName Already exists")

        except:
            user = User(username=kwargs.get('username'),email=kwargs.get('email'),address1=kwargs.get('address1'),address2=kwargs.get('address2'),city=kwargs.get('city'),state=kwargs.get('state'),pincode=kwargs.get('pincode'),birth_date=kwargs.get('birth_date',None),fathers_Name=kwargs.get('fathers_Name'),occupation=kwargs.get('occupation'),remarks=kwargs.get('remarks'),reference=kwargs.get('reference')) 
                # avatar=kwargs.get('avatar'),
            #files = info.context.FILES['imageFile']
            #user.avatar=files
            user.save()
            return CreateUser(user=user)

class UploadFile(graphene.ClientIDMutation):
    class Arguments:
        username = graphene.String(required=True)
        
     # your return fields
    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, username):
        files = info.context.FILES
        # do something with files
        try:
            user = User.objects.get(username=username)
            user.avatar=files
        except:
            return UploadFile(success=False) 
        return UploadFile(success=True)       
            


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_customer = CreateCustomer.Field()
    UploadFile = UploadFile.Field()
