import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login as loginApi } from '../api/authApi'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    setError('')
    try {
      const { token, user } = await loginApi(values)
      login(token, user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-bold">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input {...register('email')} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in…' : 'Login'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  )
}

export default Login
