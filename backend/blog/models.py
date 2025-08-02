from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email   = models.EmailField(unique=True)
    
    def __str__(self):
        return self.username

class Post(models.Model):
    title       = models.CharField(max_length=200)
    content     = models.TextField()
    author      = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    created_at  = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
