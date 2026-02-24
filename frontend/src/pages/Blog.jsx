import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../api/postsApi'
import { samplePosts } from '../data/sample'

const Blog = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['posts'], queryFn: () => fetchPosts() })
  const posts = data?.items || samplePosts

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase text-primary">Blog</p>
        <h1 className="text-3xl font-bold">Writing about shipping products</h1>
        <p className="text-muted-foreground">Short, actionable posts. Markdown supported.</p>
      </div>

      {isLoading && <div className="text-muted-foreground">Loading posts...</div>}
      {isError && <div className="text-red-500">Could not load posts. Showing sample data.</div>}

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug || post._id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-primary">{(post.tags || []).join(' · ')}</p>
            <h3 className="mt-2 text-xl font-semibold">
              <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary">
              Read more ?
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Blog
