import { useState } from 'react'
import { projectId } from '../utils/supabase/info'

interface ProfileProps {
  userProfile: any
  accessToken: string
  onUpdate: () => void
}

export function Profile({ userProfile, accessToken, onUpdate }: ProfileProps) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    expertise: userProfile?.expertise || '',
    bio: userProfile?.bio || '',
    goals: userProfile?.goals || ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setMessage('Profile updated successfully')
      setEditing(false)
      onUpdate()
    } catch (err) {
      console.error('Error updating profile:', err)
      setMessage('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  if (!editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2>My Profile</h2>
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{userProfile?.name}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{userProfile?.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <p className="text-gray-900 capitalize">{userProfile?.role}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              {userProfile?.role === 'mentor' ? 'Areas of Expertise' : 'Areas of Interest'}
            </label>
            <p className="text-gray-900">{userProfile?.expertise || 'Not specified'}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Bio</label>
            <p className="text-gray-900 whitespace-pre-wrap">{userProfile?.bio || 'Not specified'}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              {userProfile?.role === 'mentor' ? 'Mentoring Goals' : 'Learning Goals'}
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">{userProfile?.goals || 'Not specified'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="expertise" className="block text-gray-700 mb-2">
            {userProfile?.role === 'mentor' ? 'Areas of Expertise' : 'Areas of Interest'}
          </label>
          <input
            id="expertise"
            type="text"
            value={formData.expertise}
            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
            placeholder="e.g., Software Development, Marketing, Finance"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="goals" className="block text-gray-700 mb-2">
            {userProfile?.role === 'mentor' ? 'Mentoring Goals' : 'Learning Goals'}
          </label>
          <textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
