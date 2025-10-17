import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Box, Zap, Brain, Sparkles } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Box className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AiCAD.app</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-purple-400" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Transform Text into 3D CAD Models</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Design in 3D with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              AI-Powered CAD
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            AiCAD.app revolutionizes 3D modeling by converting your text descriptions into professional CAD models instantly. 
            No technical expertise required.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
              onClick={() => navigate('/register')}
            >
              Start Creating Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400/10 text-lg px-8 py-6"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400">Everything you need to create stunning 3D CAD models</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Generation</h3>
              <p className="text-gray-400">
                Our advanced AI understands your text descriptions and generates accurate 3D CAD models in seconds. 
                Simply describe what you want to create.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time Visualization</h3>
              <p className="text-gray-400">
                See your designs come to life instantly with our interactive 3D viewer. Rotate, zoom, and inspect 
                every detail of your CAD models.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">                <Box className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Refinement</h3>
              <p className="text-gray-400">
                Chat with our AI to refine and modify your designs. Make adjustments through natural conversation 
                until your model is perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email/Waitlist Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-12 rounded-3xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Waitlist</h2>
            <p className="text-xl text-purple-100 mb-8">
              Be the first to experience the future of CAD design. Get early access and exclusive updates.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => {
              e.preventDefault()
              const email = e.target.email.value
              alert(`Thank you! We'll contact you at ${email}`)
              e.target.reset()
            }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4"
              >
                Join Waitlist
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

export default LandingPage

