from django.core.management.base import BaseCommand
from api.models import User, Activity, Team, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the database with sample data for OctoFit Tracker'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users...')
        users_data = [
            {'username': 'octocat', 'email': 'octocat@mergington.edu', 'password': 'fitness123'},
            {'username': 'mona_lisa', 'email': 'mona@mergington.edu', 'password': 'fitness123'},
            {'username': 'hubot', 'email': 'hubot@mergington.edu', 'password': 'fitness123'},
            {'username': 'defunkt', 'email': 'defunkt@mergington.edu', 'password': 'fitness123'},
            {'username': 'pjhyett', 'email': 'pjhyett@mergington.edu', 'password': 'fitness123'},
        ]
        users = []
        for u in users_data:
            user = User.objects.create(**u)
            users.append(user)

        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': users[0], 'activity_type': 'running', 'duration': 30, 'date': date(2024, 1, 15), 'description': 'Morning run'},
            {'user': users[0], 'activity_type': 'cycling', 'duration': 45, 'date': date(2024, 1, 16), 'description': 'Afternoon cycling'},
            {'user': users[1], 'activity_type': 'swimming', 'duration': 60, 'date': date(2024, 1, 15), 'description': 'Lap swimming'},
            {'user': users[1], 'activity_type': 'yoga', 'duration': 40, 'date': date(2024, 1, 17), 'description': 'Morning yoga'},
            {'user': users[2], 'activity_type': 'strength_training', 'duration': 50, 'date': date(2024, 1, 15), 'description': 'Gym session'},
            {'user': users[3], 'activity_type': 'walking', 'duration': 35, 'date': date(2024, 1, 16), 'description': 'Evening walk'},
            {'user': users[4], 'activity_type': 'running', 'duration': 25, 'date': date(2024, 1, 17), 'description': 'Short run'},
        ]
        for a in activities_data:
            Activity.objects.create(**a)

        self.stdout.write('Creating teams...')
        team1 = Team.objects.create(name='Octo Runners', description='Running enthusiasts')
        team1.members.set([users[0], users[1], users[2]])
        team2 = Team.objects.create(name='Fit Cats', description='All-around fitness team')
        team2.members.set([users[2], users[3], users[4]])

        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            {'user': users[0], 'points': 320},
            {'user': users[1], 'points': 280},
            {'user': users[2], 'points': 250},
            {'user': users[3], 'points': 180},
            {'user': users[4], 'points': 150},
        ]
        for lb in leaderboard_data:
            Leaderboard.objects.create(**lb)

        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Morning Cardio Blast',
                'description': 'A high-intensity cardio workout to start your day',
                'workout_type': 'cardio',
                'duration': 30,
                'difficulty': 'intermediate',
            },
            {
                'name': 'Strength Builder',
                'description': 'Full-body strength training for all levels',
                'workout_type': 'strength',
                'duration': 45,
                'difficulty': 'beginner',
            },
            {
                'name': 'Yoga Flow',
                'description': 'Relaxing yoga session for flexibility and mindfulness',
                'workout_type': 'flexibility',
                'duration': 40,
                'difficulty': 'beginner',
            },
            {
                'name': 'HIIT Challenge',
                'description': 'High-intensity interval training for advanced athletes',
                'workout_type': 'hiit',
                'duration': 25,
                'difficulty': 'advanced',
            },
            {
                'name': 'Evening Walk',
                'description': 'A calm walking session for recovery',
                'workout_type': 'walking',
                'duration': 45,
                'difficulty': 'beginner',
            },
        ]
        for w in workouts_data:
            Workout.objects.create(**w)

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
