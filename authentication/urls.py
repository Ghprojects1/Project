from django.urls import path
#from . import views
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('Register/', views.register),
    path('login/', views.login_view),
    path('logout/', views.logout_view),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)