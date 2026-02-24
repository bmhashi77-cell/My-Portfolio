import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../api/postsApi'
import { samplePosts } from '../data/sample'

const PostDetail = () => {
  const { slug } = useParams()
  const { data, isError, isLoading } = useQuery({ queryKey: ['post', slug], queryFn: () => fetchPost(slug) })

  const fallback = samplePosts.find((p) => p.slug === slug)
  const post = data || fallback

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>
  if (!post && isError) return <div className="p-8 text-center text-red-500">Post not found.</div>

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 space-y-4">
      <p className="text-xs font-semibold uppercase text-primary">{(post.tags || []).join(' · ')}</p>
      <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
      <p className="text-muted-foreground">{post.excerpt}</p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{post.content || 'Markdown content will render here.'}</p>
      </div>
    </article>
  )
}

export default PostDetail