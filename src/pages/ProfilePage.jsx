import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Box, 
  Home, 
  User, 
  Mail, 
  Save, 
  LogOut,
  MessageSquare,
  Calendar,
  Award,
  Zap
} from 'lucide-react'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    bio: user?.bio || ''
  })

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const stats = [
    { icon: MessageSquare, label: 'Conversations', value: '12', color: 'from-purple-500 to-pink-500' },
    { icon: Box, label: 'Models Created', value: '48', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, label: 'AI Interactions', value: '156', color: 'from-green-500 to-emerald-500' },
    { icon: Award, label: 'Member Since', value: 'Jan 2025', color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Box className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">AiCAD.app</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              onClick={() => navigate('/main')}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Member since January 2025</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Form */}
          {isEditing ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Edit Profile Information</h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">Company (Optional)</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-slate-900/50 border-white/10 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio (Optional)</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Full Name</p>
                  <p className="text-lg text-white">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-lg text-white">{user?.email}</p>
                </div>
                {user?.company && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Company</p>
                    <p className="text-lg text-white">{user.company}</p>
                  </div>
                )}
                {user?.bio && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Bio</p>
                    <p className="text-lg text-white">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Created 3D model', description: 'Mechanical gear with 12 teeth', time: '2 hours ago' },
                { action: 'Started conversation', description: 'Design consultation for coffee mug', time: '5 hours ago' },
                { action: 'Downloaded model', description: 'Exported CAD file in STEP format', time: '1 day ago' },
                { action: 'Created 3D model', description: 'Custom bracket design', time: '2 days ago' }
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Box className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Box className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">AiCAD.app</span>
          </div>
          <p>© 2025 AiCAD.app. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default ProfilePage

