from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
	# Add extra fields here if needed, e.g.:
	# phone = models.CharField(max_length=20, blank=True)
	pass

class VoteRecord(models.Model):
	ip_address = models.GenericIPAddressField()
	date = models.DateField()
	contestant = models.ForeignKey('Contestant', on_delete=models.CASCADE)
	def __str__(self):
		return f"{self.ip_address} - {self.date} - {self.contestant_id}"

class Contestant(models.Model):
	name = models.CharField(max_length=100, null=True, blank=True)
	bio = models.CharField(max_length=255, null=True, blank=True)
	photoUrl = models.CharField(max_length=100, null=True, blank=True)
	votes = models.PositiveIntegerField(default=0)
	rating = models.FloatField(default=0.0, null=True, blank=True)

	def __str__(self):
		return self.name
