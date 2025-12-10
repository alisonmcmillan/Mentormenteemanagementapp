import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

// Sign up route
app.post('/make-server-fbea7b25/signup', async (c) => {
  try {
    const { email, password, name, role, profileData } = await c.req.json()
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (authError) {
      console.log(`Error creating user account: ${authError.message}`)
      return c.json({ error: authError.message }, 400)
    }

    // Store profile data in KV store
    const userId = authData.user.id
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
      ...profileData
    })

    return c.json({ 
      success: true, 
      userId,
      message: 'Account created successfully' 
    })
  } catch (error) {
    console.log(`Error in signup route: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Submit application
app.post('/make-server-fbea7b25/applications', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const applicationData = await c.req.json()
    const applicationId = `app:${user.id}:${Date.now()}`
    
    await kv.set(applicationId, {
      id: applicationId,
      userId: user.id,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      ...applicationData
    })

    // TODO: Send to Monday.com and email
    // This would integrate with Monday.com API and email service
    console.log('Application submitted, ready for Monday.com/email integration')

    return c.json({ 
      success: true, 
      applicationId,
      message: 'Application submitted successfully' 
    })
  } catch (error) {
    console.log(`Error submitting application: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Get all applications (for admin review)
app.get('/make-server-fbea7b25/applications', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const applications = await kv.getByPrefix('app:')
    
    return c.json({ applications })
  } catch (error) {
    console.log(`Error fetching applications: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Update profile
app.put('/make-server-fbea7b25/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profileData = await c.req.json()
    const existingProfile = await kv.get(`user:${user.id}`)
    
    await kv.set(`user:${user.id}`, {
      ...existingProfile,
      ...profileData,
      updatedAt: new Date().toISOString()
    })

    return c.json({ success: true, message: 'Profile updated successfully' })
  } catch (error) {
    console.log(`Error updating profile: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Get profile
app.get('/make-server-fbea7b25/profile/:userId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const userId = c.req.param('userId')
    const profile = await kv.get(`user:${userId}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    return c.json({ profile })
  } catch (error) {
    console.log(`Error fetching profile: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Get all users by role
app.get('/make-server-fbea7b25/users/:role', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const role = c.req.param('role')
    const allUsers = await kv.getByPrefix('user:')
    const filteredUsers = allUsers.filter((u: any) => u.role === role)
    
    return c.json({ users: filteredUsers })
  } catch (error) {
    console.log(`Error fetching users: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Create meeting
app.post('/make-server-fbea7b25/meetings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const meetingData = await c.req.json()
    const meetingId = `meeting:${Date.now()}`
    
    await kv.set(meetingId, {
      id: meetingId,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      ...meetingData
    })

    return c.json({ 
      success: true, 
      meetingId,
      message: 'Meeting scheduled successfully' 
    })
  } catch (error) {
    console.log(`Error creating meeting: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Get meetings for a user
app.get('/make-server-fbea7b25/meetings/:userId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const userId = c.req.param('userId')
    const allMeetings = await kv.getByPrefix('meeting:')
    const userMeetings = allMeetings.filter((m: any) => 
      m.mentorId === userId || m.menteeId === userId
    )
    
    return c.json({ meetings: userMeetings })
  } catch (error) {
    console.log(`Error fetching meetings: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Create note
app.post('/make-server-fbea7b25/notes', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const noteData = await c.req.json()
    const noteId = `note:${user.id}:${Date.now()}`
    
    await kv.set(noteId, {
      id: noteId,
      mentorId: user.id,
      createdAt: new Date().toISOString(),
      ...noteData
    })

    return c.json({ 
      success: true, 
      noteId,
      message: 'Note saved successfully' 
    })
  } catch (error) {
    console.log(`Error creating note: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

// Get notes for a mentee
app.get('/make-server-fbea7b25/notes/:menteeId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const menteeId = c.req.param('menteeId')
    const allNotes = await kv.getByPrefix('note:')
    const menteeNotes = allNotes.filter((n: any) => 
      n.menteeId === menteeId && n.mentorId === user.id
    )
    
    return c.json({ notes: menteeNotes })
  } catch (error) {
    console.log(`Error fetching notes: ${error}`)
    return c.json({ error: String(error) }, 500)
  }
})

Deno.serve(app.fetch)
