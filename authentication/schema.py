import graphene
from graphene_django import DjangoObjectType
from .models import User

class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType, username=graphene.String(required=True))

    def resolve_users(self, info):
        # We can easily optimize query count in the resolve method
        return User.objects.all()

    def resolve_user(self, info, username):
        # We can easily optimize query count in the resolve method
        return User.objects.get(username=username)

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

    