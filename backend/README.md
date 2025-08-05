# Blog Application (Full Stack)

A blog app with JWT authentication, built with **Django (Backend)** and **React/Next.js (Frontend)**.

## Features
- User registration/login with JWT
- Create, edit, delete blog posts (author-only)
- Public post viewing
- Custom middleware for request logging

## Live Demos
- **Frontend**: [https://blog-app-kohl-ten.vercel.app/](https://blog-app-kohl-ten.vercel.app/)
- **Backend**: [https://blogapp-backend-cjix.onrender.com](https://blogapp-backend-cjix.onrender.com)

## Tech Stack
**Backend**: Django, Django REST Framework, PostgreSQL, JWT  
**Frontend**: Next.js, React, Tailwind CSS, Axios

## Quick Setup

### Backend (Django)
```bash
git clone https://github.com/Arrjoon/blogApp.git
cd blogApp/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (Next.js)
```bash
cd ../frontend
npm install
npm run dev
```

## Environment Variables

**Backend (.env)**:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## API Endpoints
- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login user
- `GET /api/posts/` - List posts
- `POST /api/posts/` - Create post (auth required)
- `PUT /api/posts/{id}/` - Update post (author only)
- `DELETE /api/posts/{id}/` - Delete post (author only)

## Usage
1. Register/login at `/auth/login`
2. Browse posts on home page
3. Create posts with "New Post" button
4. Edit/delete your own posts

## Project Structure
```
blogApp/
├── backend/           # Django REST API
│   ├── blog/         # Blog app
│   ├── authentication/  # Auth app
│   └── manage.py
├── frontend/         # Next.js app
│   ├── pages/       # App pages
│   ├── components/  # UI components
│   └── package.json
```

## Deployment
- **Backend**: Deploy to Render with `gunicorn blogproject.wsgi:application`
- **Frontend**: Deploy to Vercel (auto-detects Next.js)

## Author
[Arrjoon](https://github.com/Arrjoon)

---
⭐ Star this repo if helpful!