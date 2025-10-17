import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Box, 
  LogOut, 
  User, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Brain, 
  Layers, 
  Download,
  Mail,
  Send
} from 'lucide-react'

const MainPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [contactForm, setContactForm] = useState({
    email: user?.email || '',
    message: ''
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for your message! We'll get back to you at ${contactForm.email}`)
    setContactForm({ ...contactForm, message: '' })
  }

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Transform text descriptions into accurate 3D CAD models using advanced AI technology.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Generate complex CAD models in seconds, not hours. Speed up your design workflow dramatically.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Refinement',
      description: 'Chat with AI to refine your designs. Make adjustments through natural conversation.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Box,
      title: '3D Visualization',
      description: 'View your models in real-time 3D. Rotate, zoom, and inspect every detail interactively.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Layers,
      title: 'Multiple Formats',
      description: 'Export your CAD models in various industry-standard formats for seamless integration.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download your 3D models and use them in your favorite CAD software or 3D printing.',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Box className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AiCAD.app</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {user?.name}!</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-purple-400"
              onClick={() => navigate('/profile')}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Start Creating Amazing 3D Models</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Design?
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Start a conversation with our AI and watch your ideas transform into professional 3D CAD models.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 animate-fade-in-up animation-delay-400"
            onClick={() => navigate('/conversation')}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start New Conversation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-xl text-gray-400">Everything you need to bring your 3D designs to life</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Message Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-12 rounded-3xl">
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-xl text-purple-100">
                Have questions or feedback? Send us a message and we'll get back to you soon.
              </p>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="bg-white/90 text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your message..."
                  required
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="bg-white/90 text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-purple-300 resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

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

export default MainPage

