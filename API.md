# API Reference
Base URL: `http://localhost:8000/api`

## Auth
- `POST /auth/register` — body: `{ name, email, password }`
- `POST /auth/login` — body: `{ email, password }` ? `{ user, token }`
- `GET /auth/me` — header: `Authorization: Bearer <token>` ? `{ user }
`

## Projects
- `GET /projects?search=&tech=&page=1&limit=9&featured=true`
- `GET /projects/:id`
- `POST /projects` (admin) — body: `{ title, description, techStack:[], githubUrl, liveUrl, images:[], featured }`
- `PUT /projects/:id` (admin) — same body
- `DELETE /projects/:id` (admin)

Sample create request:
```bash
curl -X POST http://localhost:8000/api/projects \
 -H "Authorization: Bearer <token>" \
 -H "Content-Type: application/json" \
 -d '{
   "title":"AI Resume Ranker",
   "description":"ATS-friendly resume ranking microservice",
   "techStack":["Node","MongoDB","OpenAI"],
   "githubUrl":"https://github.com/your/ai-resume",
   "featured":true
 }'
```

## Blog Posts
- `GET /posts?search=&tag=&page=1&limit=10`
- `GET /posts/:slug`
- `POST /posts` (admin) — body: `{ title, excerpt, content, tags:[], coverImage }`
- `PUT /posts/:slug` (admin)
- `DELETE /posts/:slug` (admin)

## Contact Messages
- `POST /contact` — body: `{ name, email, subject, message }`
- `GET /contact` (admin) — list messages
- `DELETE /contact/:id` (admin)

## Auth Header
Use `Authorization: Bearer <token>` for admin-only endpoints.

## Error Shape
```
{ "message": "string", "stack": "?" }
```
