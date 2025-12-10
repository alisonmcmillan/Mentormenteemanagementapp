import { useState } from 'react'
import { projectId } from '../utils/supabase/info'
import { Send, CheckCircle } from 'lucide-react'

interface ApplicationFormProps {
  userProfile: any
  accessToken: string
}

export function ApplicationForm({ userProfile, accessToken }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    availability: '',
    experience: '',
    expectations: '',
    commitment: '',
    additionalInfo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/applications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            role: userProfile.role,
            name: userProfile.name,
            email: userProfile.email,
            ...formData
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting application:', err)
      alert('Error submitting application')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="size-16 mx-auto mb-4 text-green-600" />
        <h2 className="mb-3">Application Submitted!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for submitting your application. Our team will review it and get back to you soon.
        </p>
        <p className="text-gray-500 text-sm">
          <strong>Note:</strong> Your application has been stored and is ready for integration with Monday.com and email notifications.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-2">
        {userProfile?.role === 'mentor' ? 'Mentor' : 'Mentee'} Application
      </h2>
      <p className="text-gray-600 mb-6">
        Complete this application to join our mentorship program. Your responses will be reviewed by our team.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="availability" className="block text-gray-700 mb-2">
            Availability *
          </label>
          <p className="text-gray-500 text-sm mb-2">
            What is your availability for {userProfile?.role === 'mentor' ? 'mentoring sessions' : 'mentorship meetings'}?
          </p>
          <textarea
            id="availability"
            required
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            rows={3}
            placeholder="e.g., Available Monday and Wednesday evenings, flexible on weekends"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-gray-700 mb-2">
            {userProfile?.role === 'mentor' ? 'Professional Experience *' : 'Relevant Background *'}
          </label>
          <p className="text-gray-500 text-sm mb-2">
            {userProfile?.role === 'mentor' 
              ? 'Describe your professional background and areas of expertise.'
              : 'Share your educational background and career interests.'}
          </p>
          <textarea
            id="experience"
            required
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="expectations" className="block text-gray-700 mb-2">
            Expectations *
          </label>
          <p className="text-gray-500 text-sm mb-2">
            What do you hope to {userProfile?.role === 'mentor' ? 'provide' : 'gain'} from this mentorship program?
          </p>
          <textarea
            id="expectations"
            required
            value={formData.expectations}
            onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="commitment" className="block text-gray-700 mb-2">
            Commitment Level *
          </label>
          <p className="text-gray-500 text-sm mb-2">
            How much time can you commit to the mentorship program per month?
          </p>
          <select
            id="commitment"
            required
            value={formData.commitment}
            onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select commitment level</option>
            <option value="2-4 hours">2-4 hours per month</option>
            <option value="4-8 hours">4-8 hours per month</option>
            <option value="8-12 hours">8-12 hours per month</option>
            <option value="12+ hours">12+ hours per month</option>
          </select>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-gray-700 mb-2">
            Additional Information
          </label>
          <p className="text-gray-500 text-sm mb-2">
            Is there anything else you&apos;d like us to know?
          </p>
          <textarea
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="size-5" />
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900">
          <strong>Integration Note:</strong> Applications are automatically prepared for review via Monday.com and email notifications.
          To complete the integration, connect your Monday.com workspace and email service credentials.
        </p>
      </div>
    </div>
  )
}
