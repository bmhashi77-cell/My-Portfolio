import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProject, deleteProject, fetchProjects, updateProject } from '../api/projectsApi'
import { createPost, deletePost, fetchPosts, updatePost } from '../api/postsApi'
import { deleteMessage, fetchMessages } from '../api/contactApi'
import { useAuth } from '../providers/AuthProvider'

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-semibold ${active ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
  >
    {children}
  </button>
)

const ProjectsTab = () => {
  const { token } = useAuth()
  const client = useQueryClient()
  const { data } = useQuery({ queryKey: ['projects-admin'], queryFn: () => fetchProjects() })
  const projects = data?.items || []
  const form = useForm({ defaultValues: { title: '', description: '', techStack: '' } })

  const createMut = useMutation({
    mutationFn: (payload) => createProject(payload, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['projects-admin'] }),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => updateProject(id, payload, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['projects-admin'] }),
  })

  const deleteMut = useMutation({
    mutationFn: (id) => deleteProject(id, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['projects-admin'] }),
  })

  const onSubmit = (values) => {
    const payload = {
      ...values,
      techStack: values.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    }
    if (values.id) {
      updateMut.mutate({ id: values.id, payload })
    } else {
      createMut.mutate(payload)
    }
    form.reset({ title: '', description: '', techStack: '' })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <input placeholder="Project title" {...form.register('title')} className="rounded-lg border border-border px-3 py-2" />
          <input placeholder="Tech stack (comma separated)" {...form.register('techStack')} className="rounded-lg border border-border px-3 py-2" />
        </div>
        <textarea placeholder="Description" rows={3} {...form.register('description')} className="w-full rounded-lg border border-border px-3 py-2" />
        <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          {form.watch('id') ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p._id} className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{p.title}</h4>
              <div className="flex gap-2 text-xs">
                <button
                  className="rounded-full bg-primary/10 px-3 py-1"
                  onClick={() => form.reset({ ...p, techStack: (p.techStack || []).join(', ') })}
                >
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-500/10 px-3 py-1 text-red-600"
                  onClick={() => deleteMut.mutate(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const PostsTab = () => {
  const { token } = useAuth()
  const client = useQueryClient()
  const { data } = useQuery({ queryKey: ['posts-admin'], queryFn: () => fetchPosts() })
  const posts = data?.items || []
  const form = useForm({ defaultValues: { title: '', excerpt: '', content: '', tags: '' } })

  const createMut = useMutation({
    mutationFn: (payload) => createPost(payload, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['posts-admin'] }),
  })
  const updateMut = useMutation({
    mutationFn: ({ slug, payload }) => updatePost(slug, payload, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['posts-admin'] }),
  })
  const deleteMut = useMutation({
    mutationFn: (slug) => deletePost(slug, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['posts-admin'] }),
  })

  const onSubmit = (values) => {
    const payload = {
      ...values,
      tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }
    if (values.slug) updateMut.mutate({ slug: values.slug, payload })
    else createMut.mutate(payload)
    form.reset({ title: '', excerpt: '', content: '', tags: '' })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <input placeholder="Title" {...form.register('title')} className="w-full rounded-lg border border-border px-3 py-2" />
        <input placeholder="Excerpt" {...form.register('excerpt')} className="w-full rounded-lg border border-border px-3 py-2" />
        <textarea placeholder="Content (markdown)" rows={4} {...form.register('content')} className="w-full rounded-lg border border-border px-3 py-2" />
        <input placeholder="Tags comma separated" {...form.register('tags')} className="w-full rounded-lg border border-border px-3 py-2" />
        <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          {form.watch('slug') ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.slug} className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{post.title}</h4>
              <div className="flex gap-2 text-xs">
                <button
                  className="rounded-full bg-primary/10 px-3 py-1"
                  onClick={() => form.reset({ ...post, tags: (post.tags || []).join(', ') })}
                >
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-500/10 px-3 py-1 text-red-600"
                  onClick={() => deleteMut.mutate(post.slug)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const MessagesTab = () => {
  const { token } = useAuth()
  const client = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['messages'], queryFn: () => fetchMessages(token) })
  const messages = data || []
  const deleteMut = useMutation({
    mutationFn: (id) => deleteMessage(id, token),
    onSuccess: () => client.invalidateQueries({ queryKey: ['messages'] }),
  })

  if (isLoading) return <div>Loading messages...</div>

  return (
    <div className="space-y-3">
      {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
      {messages.map((msg) => (
        <div key={msg._id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{msg.name}</p>
              <p className="text-sm text-muted-foreground">{msg.email}</p>
            </div>
            <button
              className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600"
              onClick={() => deleteMut.mutate(msg._id)}
            >
              Delete
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{msg.subject}</p>
          <p className="mt-2 text-sm">{msg.message}</p>
        </div>
      ))}
    </div>
  )
}

const Admin = () => {
  const [tab, setTab] = useState('projects')

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Admin</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')}>
            Projects
          </TabButton>
          <TabButton active={tab === 'posts'} onClick={() => setTab('posts')}>
            Blog
          </TabButton>
          <TabButton active={tab === 'messages'} onClick={() => setTab('messages')}>
            Messages
          </TabButton>
        </div>
      </div>

      {tab === 'projects' && <ProjectsTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'messages' && <MessagesTab />}
    </div>
  )
}

export default Admin
