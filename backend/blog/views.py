import json
from django.http import JsonResponse
from django.views import View
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from .models import Post
from .utils import generate_jwt_token,get_user_from_token

User = get_user_model()



def json_response(data, status=200):
    return JsonResponse(data, status=status)

def error_response(message, status=400):
    return JsonResponse({'error': message}, status=status)



@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            if not username or not email or not password:
                return error_response('Username, email, and password are required', 400)
            
            if User.objects.filter(username=username).exists():
                return error_response('Username already exists', 400)
            
            if User.objects.filter(email=email).exists():
                return error_response('Email already exists', 400)
            
            if len(password) < 6:
                return error_response('Password must be at least 6 characters', 400)
            
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password)
            )
            
            token = generate_jwt_token(user)
            
            return json_response({
                'message': 'User registered successfully',
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, 201)
            
        except json.JSONDecodeError:
            return error_response('Invalid JSON', 400)
        except Exception as e:
            return error_response(str(e), 500)

@method_decorator(csrf_exempt,name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return error_response('Username and password are required', 400)
            
            user = authenticate(username=username, password=password)
            
            if not user:
                return error_response('Invalid credentials', 401)
            
            token = generate_jwt_token(user)
            
            return json_response({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })
            
        except json.JSONDecodeError:
            return error_response('Invalid JSON', 400)
        except Exception as e:
            return error_response(str(e), 500)


class PostListView(View):
    def get(self, request):
        try:
            posts = Post.objects.all()
            posts_data = []
            
            for post in posts:
                posts_data.append({
                    'id': post.id,
                    'title': post.title,
                    'content': post.content,
                    'author': post.author.username,
                    'created_at': post.created_at.isoformat()
                })
            
            return json_response({'posts': posts_data})
            
        except Exception as e:
            return error_response(str(e), 500)
    
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        try:
            user = get_user_from_token(request)
            if user == 'expired':
                return error_response('Token has expired. Please login again.', 401)
            if not user:
                return error_response('Authentication required', 401)
            
            data = json.loads(request.body)
            title = data.get('title')
            content = data.get('content')
            
            if not title or not content:
                return error_response('Title and content are required', 400)
            
            post = Post.objects.create(
                title=title,
                content=content,
                author=user
            )
            
            return json_response({
                'message': 'Post created successfully',
                'post': {
                    'id': post.id,
                    'title': post.title,
                    'content': post.content,
                    'author': post.author.username,
                    'created_at': post.created_at.isoformat()
                }
            }, 201)
            
        except json.JSONDecodeError:
            return error_response('Invalid JSON', 400)
        except Exception as e:
            return error_response(str(e), 500)

class PostDetailView(View):
    def get(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            
            post_data = {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'author': post.author.username,
                'created_at': post.created_at.isoformat()
            }
            
            return json_response(post_data)
            
        except Post.DoesNotExist:
            return error_response('Post not found', 404)
        except Exception as e:
            return error_response(str(e), 500)
    
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def put(self, request, post_id):
        try:
            user = get_user_from_token(request)
            if not user:
                return error_response('Authentication required', 401)
            
            post = Post.objects.get(id=post_id)
            
            if post.author != user:
                return error_response('You can only edit your own posts', 403)
            
            data = json.loads(request.body)
            title = data.get('title')
            content = data.get('content')
            
            if title:
                post.title = title
            if content:
                post.content = content
            
            post.save()
            
            return json_response({
                'message': 'Post updated successfully',
                'post': {
                    'id': post.id,
                    'title': post.title,
                    'content': post.content,
                    'author': post.author.username,
                    'created_at': post.created_at.isoformat()
                }
            })
            
        except Post.DoesNotExist:
            return error_response('Post not found', 404)
        except json.JSONDecodeError:
            return error_response('Invalid JSON', 400)
        except Exception as e:
            return error_response(str(e), 500)
    
    def delete(self, request, post_id):
        try:
            user = get_user_from_token(request)
            if not user:
                return error_response('Authentication required', 401)
            
            post = Post.objects.get(id=post_id)
            
            if post.author != user:
                return error_response('You can only delete your own posts', 403)
            
            post.delete()
            
            return json_response({'message': 'Post deleted successfully'})
            
        except Post.DoesNotExist:
            return error_response('Post not found', 404)
        except Exception as e:
            return error_response(str(e), 500)
