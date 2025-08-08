from django.core.management.base import BaseCommand
from users.models import Contestant

class Command(BaseCommand):
    help = 'Syncs contestants with frontend data.'

    def handle(self, *args, **options):
        contestants = [
            {
                'id': 1,
                'name': 'Amara Kenyatta',
                'bio': 'Nairobi County • 24 years',
                'photoUrl': 'miss2.jpg',
                'votes': 1245,
                'rating': 4.5,
            },
            {
                'id': 2,
                'name': 'Zuri Ochieng',
                'bio': 'Mombasa County • 23 years',
                'photoUrl': 'miss4.jpg',
                'votes': 982,
                'rating': 4.0,
            },
            {
                'id': 3,
                'name': 'Nia Kimani',
                'bio': 'Kisumu County • 25 years',
                'photoUrl': 'miss5.jpg',
                'votes': 876,
                'rating': 4.0,
            },
            {
                'id': 4,
                'name': 'Imani Wanjiku',
                'bio': 'Nakuru County • 22 years',
                'photoUrl': 'miss6.jpg',
                'votes': 754,
                'rating': 3.5,
            },
            {
                'id': 5,
                'name': 'Aisha Mwangi',
                'bio': 'Eldoret County • 24 years',
                'photoUrl': 'miss7.jpg',
                'votes': 621,
                'rating': 3.0,
            },
            {
                'id': 6,
                'name': 'Makena Njeri',
                'bio': 'Nyeri County • 23 years',
                'photoUrl': 'miss11.jpg',
                'votes': 589,
                'rating': 3.0,
            },
        ]
        for c in contestants:
            obj, created = Contestant.objects.update_or_create(
                id=c['id'],
                defaults={
                    'name': c['name'],
                    'bio': c['bio'],
                    'photoUrl': c['photoUrl'],
                    'votes': c['votes'],
                    'rating': c['rating'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created {obj.name}"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Updated {obj.name}"))
        self.stdout.write(self.style.SUCCESS('Contestant sync complete.'))
