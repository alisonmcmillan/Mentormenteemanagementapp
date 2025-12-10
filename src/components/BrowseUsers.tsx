import { useState, useEffect } from 'react'
import { projectId } from '../utils/supabase/info'
import { Mail, BookOpen } from 'lucide-react'

interface BrowseUsersProps {
  userProfile: any
  accessToken: string
}

export function BrowseUsers({ userProfile, accessToken }: BrowseUsersProps) {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const targetRole = userProfile?.role === 'mentor' ? 'mentee' : 'mentor'
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/users/${targetRole}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      const data = await response.json()

      if (response.ok && data.users) {
        setUsers(data.users)
      } else {
        console.error('Error loading users:', data.error)
      }
    } catch (err) {
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  const targetRole = userProfile?.role === 'mentor' ? 'Mentees' : 'Mentors'

  return (
    <div>
      <h2 className="mb-6">Browse {targetRole}</h2>

      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No {targetRole.toLowerCase()} found yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="mb-2">{user.name}</h3>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-start gap-2">
                  <Mail className="size-4 mt-1 flex-shrink-0" />
                  <span className="break-all">{user.email}</span>
                </div>

                {user.expertise && (
                  <div className="flex items-start gap-2">
                    <BookOpen className="size-4 mt-1 flex-shrink-0" />
                    <span>{user.expertise}</span>
                  </div>
                )}

                {user.bio && (
                  <div className="mt-3">
                    <p className="text-gray-700">{user.bio}</p>
                  </div>
                )}

                {user.goals && (
                  <div className="mt-3">
                    <p className="text-gray-500 italic">&quot;{user.goals}&quot;</p>
                  </div>
                )}
              </div>

              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
