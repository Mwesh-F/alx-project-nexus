
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
	# Add extra fields here if needed, e.g.:
	# phone = models.CharField(max_length=20, blank=True)
	pass
