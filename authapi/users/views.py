# Voting endpoint
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status


from .models import VoteRecord

class VoteView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        contestant_id = request.data.get('contestantId')
        if not contestant_id:
            return Response({'detail': 'Contestant ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        from .models import Contestant
        contestant = Contestant.objects.filter(id=contestant_id).first()
        if not contestant:
            return Response({'detail': 'Contestant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Prevent double voting
        if request.user.has_voted:
            return Response({'detail': 'You have already voted.'}, status=status.HTTP_403_FORBIDDEN)

        contestant.votes += 1
        contestant.save()
        request.user.has_voted = True
        request.user.save()

        return Response({'message': 'Vote recorded!'}, status=status.HTTP_200_OK)
from rest_framework import generics, permissions
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import CustomUser  # or your user model
from .models import Contestant

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class VoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from datetime import date
        contestant_id = request.data.get('contestantId')
        if not contestant_id:
            return Response({'detail': 'Contestant ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        contestant = get_object_or_404(Contestant, id=contestant_id)

        # Get client IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        today = date.today()
        # Check if this IP has already voted today
        if VoteRecord.objects.filter(ip_address=ip, date=today).exists():
            return Response({'detail': 'You have already voted today. Please come back tomorrow.'}, status=status.HTTP_403_FORBIDDEN)

        contestant.votes += 1
        contestant.save()

        # Record the vote
        VoteRecord.objects.create(ip_address=ip, date=today, contestant=contestant)

        return Response({'message': 'Vote recorded!'}, status=status.HTTP_200_OK)
