# Voting endpoint
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class VoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        contestant_id = request.data.get('contestantId')
        if not contestant_id:
            return Response({'detail': 'Contestant ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Import Contestant model from the correct app
        from users.models import CustomUser  # adjust if Contestant is in another app
        from yourapp.models import Contestant  # replace 'yourapp' with the actual app name

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
from contestants.models import Contestant  # replace 'contestants' with your actual app name if different

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class VoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        contestant_id = request.data.get('contestantId')
        if not contestant_id:
            return Response({'detail': 'Contestant ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        contestant = get_object_or_404(Contestant, id=contestant_id)

        # Optional: Prevent double voting per user
        if hasattr(request.user, 'has_voted') and request.user.has_voted:
            return Response({'detail': 'You have already voted.'}, status=status.HTTP_403_FORBIDDEN)

        contestant.votes += 1
        contestant.save()

        # Optional: Mark user as having voted
        # request.user.has_voted = True
        # request.user.save()

        return Response({'message': 'Vote recorded!'}, status=status.HTTP_200_OK)
