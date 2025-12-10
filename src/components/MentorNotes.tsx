import { useState, useEffect } from 'react'
import { projectId } from '../utils/supabase/info'
import { FileText, Plus, Calendar } from 'lucide-react'

interface MentorNotesProps {
  userProfile: any
  accessToken: string
}

export function MentorNotes({ userProfile, accessToken }: MentorNotesProps) {
  const [notes, setNotes] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    menteeId: '',
    menteeName: '',
    subject: '',
    content: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/notes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            menteeId: formData.menteeId || 'demo-mentee',
            menteeName: formData.menteeName,
            subject: formData.subject,
            content: formData.content
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save note')
      }

      setShowForm(false)
      setFormData({
        menteeId: '',
        menteeName: '',
        subject: '',
        content: ''
      })
      
      // Add the new note to the list
      setNotes([{
        id: data.noteId,
        menteeName: formData.menteeName,
        subject: formData.subject,
        content: formData.content,
        createdAt: new Date().toISOString()
      }, ...notes])
    } catch (err) {
      console.error('Error saving note:', err)
      alert('Error saving note')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Mentee Notes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="size-5" />
          Add Note
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mb-4">New Mentee Note</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="menteeName" className="block text-gray-700 mb-2">
                Mentee Name
              </label>
              <input
                id="menteeName"
                type="text"
                required
                value={formData.menteeName}
                onChange={(e) => setFormData({ ...formData, menteeName: e.target.value })}
                placeholder="Enter mentee name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Career Development Discussion"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                placeholder="Enter your notes about the mentee, meeting discussions, progress, goals, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Note'}
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
        {notes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="size-12 mx-auto mb-3 text-gray-400" />
            <p>No notes yet.</p>
            <p className="text-sm">Click &quot;Add Note&quot; to create your first mentee note.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="mb-1">{note.subject}</h3>
                  <p className="text-gray-600">{note.menteeName}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="size-4" />
                  {formatDate(note.createdAt)}
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
