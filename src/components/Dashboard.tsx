import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { Calendar, Users, FileText, LogOut, User } from 'lucide-react'
import { Profile } from './Profile'
import { CalendarView } from './CalendarView'
import { MentorNotes } from './MentorNotes'
import { ApplicationForm } from './ApplicationForm'
import { BrowseUsers } from './BrowseUsers'

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [userProfile, setUserProfile] = useState<any>(null)
  const [accessToken, setAccessToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      )

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session) {
        console.error('Session error:', sessionError)
        onLogout()
        return
      }

      setAccessToken(session.access_token)

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fbea7b25/profile/${session.user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      )

      const data = await response.json()

      if (response.ok && data.profile) {
        setUserProfile(data.profile)
      } else {
        console.error('Error loading profile:', data.error)
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    )
    await supabase.auth.signOut()
    onLogout()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'browse', label: userProfile?.role === 'mentor' ? 'Browse Mentees' : 'Browse Mentors', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'application', label: 'Application', icon: FileText },
  ]

  if (userProfile?.role === 'mentor') {
    tabs.push({ id: 'notes', label: 'Mentee Notes', icon: FileText })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1>Mentorship Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              {userProfile?.name} ({userProfile?.role})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="size-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'profile' && (
            <Profile 
              userProfile={userProfile} 
              accessToken={accessToken}
              onUpdate={loadUserProfile}
            />
          )}
          {activeTab === 'browse' && (
            <BrowseUsers 
              userProfile={userProfile}
              accessToken={accessToken}
            />
          )}
          {activeTab === 'calendar' && (
            <CalendarView 
              userProfile={userProfile}
              accessToken={accessToken}
            />
          )}
          {activeTab === 'application' && (
            <ApplicationForm 
              userProfile={userProfile}
              accessToken={accessToken}
            />
          )}
          {activeTab === 'notes' && userProfile?.role === 'mentor' && (
            <MentorNotes 
              userProfile={userProfile}
              accessToken={accessToken}
            />
          )}
        </div>
      </div>
    </div>
  )
}