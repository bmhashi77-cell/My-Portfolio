import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendMessage } from '../api/contactApi'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

const Contact = () => {
  const [status, setStatus] = useState('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    try {
      setStatus('loading')
      await sendMessage(values)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-semibold uppercase text-primary">Contact</p>
        <h1 className="text-3xl font-bold">Let's talk about your project</h1>
        <p className="text-muted-foreground">I reply within 24 hours. Include goals, timeline, and budget range if possible.</p>
      </div>

      <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input {...register('name')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input {...register('email')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold">Subject</label>
            <input {...register('subject')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2" />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea
              {...register('message')}
              rows={5}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' && <p className="text-sm text-green-600">Message sent!</p>}
          {status === 'error' && <p className="text-sm text-red-500">Could not send message.</p>}
        </form>

        <aside className="space-y-4 rounded-2xl border border-border bg-muted/60 p-6">
          <h3 className="text-lg font-semibold">Contact info</h3>
          <p className="text-sm text-muted-foreground">Email: [your@email.com]</p>
          <p className="text-sm text-muted-foreground">Location: United States (remote friendly)</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>GitHub: github.com/yourusername</p>
            <p>LinkedIn: linkedin.com/in/yourusername</p>
            <p>Twitter: twitter.com/yourusername</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Contact
