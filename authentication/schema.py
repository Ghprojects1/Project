import graphene
from graphene_django import DjangoObjectType
from .models import User
from loan.models import Loan

class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    search_user = graphene.Field(UserType, username=graphene.String(required=True))

    me = graphene.Field(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_search_user(self, info, username):
        return User.objects.get(username=username)
    
    def resolve_me(self,info):
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
        user = User.objects.get(username=username)
        if user is None:
            user = User(username=username, email=email)
        else:
            user.email = email

        user.set_password(password)
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

    