import { useState, useEffect } from 'react'
import { projectId } from '../utils/supabase/info'
import { Calendar, Plus, Clock, User } from 'lucide-react'

interface CalendarViewProps {
  userProfile: any
  accessToken: string
}

export function CalendarView({ userProfile, accessToken }: CalendarViewProps) {
  const [meetings, setMeetings] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    mentorId: '',
    menteeId: '',
    description: ''
  })

  useEffect(() => {
    loadMeetings()
  }, [])

  const loadMeetings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/meetings/${userProfile.id}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      const data = await response.json()

      if (response.ok && data.meetings) {
        setMeetings(data.meetings)
      } else {
        console.error('Error loading meetings:', data.error)
      }
    } catch (err) {
      console.error('Error loading meetings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/meetings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            ...formData,
            mentorId: userProfile.role === 'mentor' ? userProfile.id : formData.mentorId,
            menteeId: userProfile.role === 'mentee' ? userProfile.id : formData.menteeId
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create meeting')
      }

      setShowForm(false)
      setFormData({
        title: '',
        date: '',
        time: '',
        duration: '60',
        mentorId: '',
        menteeId: '',
        description: ''
      })
      loadMeetings()
    } catch (err) {
      console.error('Error creating meeting:', err)
      alert('Error creating meeting')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr)
    return `${date.toLocaleDateString()} at ${timeStr}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Calendar & Meetings</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="size-5" />
          Schedule Meeting
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mb-4">Schedule New Meeting</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Meeting Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-gray-700 mb-2">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-gray-700 mb-2">
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="size-12 mx-auto mb-3 text-gray-400" />
            <p>No meetings scheduled yet.</p>
            <p className="text-sm">Click &quot;Schedule Meeting&quot; to get started.</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3>{meeting.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Scheduled
                </span>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>{formatDate(meeting.date, meeting.time)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  <span>{meeting.duration} minutes</span>
                </div>

                {meeting.description && (
                  <p className="text-gray-700 mt-3">{meeting.description}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
