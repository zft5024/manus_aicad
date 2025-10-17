import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Box, 
  Home, 
  User, 
  Send, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Maximize,
  Bot,
  User as UserIcon
} from 'lucide-react'

const ConversationPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI CAD assistant. Describe the 3D model you want to create, and I\'ll generate it for you. For example, try "Create a simple gear with 12 teeth" or "Design a coffee mug with a handle".'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 20, y: 45 })
  const [zoom, setZoom] = useState(1)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isGenerating) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I\'ve generated a 3D CAD model based on your description. You can see it in the viewer on the left. The model includes all the specifications you mentioned. Would you like me to make any adjustments?',
        'Great! I\'ve created the model you requested. It\'s now visible in the 3D viewer. You can rotate and zoom to inspect it from all angles. Let me know if you\'d like to modify anything.',
        'The CAD model has been generated successfully! Check out the 3D viewer on the left to see your design. Feel free to ask for any changes or refinements.',
        'Perfect! Your 3D model is ready and displayed in the viewer. I\'ve incorporated all the details from your description. Would you like to adjust any dimensions or features?'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsGenerating(false)
    }, 1500)
  }

  const resetView = () => {
    setRotation({ x: 20, y: 45 })
    setZoom(1)
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="bg-slate-800/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
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
            <span className="text-gray-300">{user?.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-purple-400"
              onClick={() => navigate('/profile')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewer Section */}
        <div className="w-1/2 border-r border-white/10 bg-slate-800/50 flex flex-col">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">3D CAD Viewer</h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
                onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
                onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
                onClick={resetView}
              >
                <RotateCw className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <Maximize className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-400 hover:text-purple-300"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* 3D Canvas */}
          <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <div 
              className="relative transition-transform duration-300"
              style={{ 
                transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Simple 3D Box Representation */}
              <div className="relative w-64 h-64" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform: 'translateZ(128px)' }}
                >
                  <Box className="w-24 h-24 text-purple-400/50" />
                </div>
                {/* Back face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-2 border-blue-400/50 backdrop-blur-sm"
                  style={{ transform: 'translateZ(-128px) rotateY(180deg)' }}
                />
                {/* Right face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400/50 backdrop-blur-sm"
                  style={{ transform: 'rotateY(90deg) translateZ(128px)' }}
                />
                {/* Left face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-orange-500/30 to-red-500/30 border-2 border-orange-400/50 backdrop-blur-sm"
                  style={{ transform: 'rotateY(-90deg) translateZ(128px)' }}
                />
                {/* Top face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-violet-500/30 to-purple-500/30 border-2 border-violet-400/50 backdrop-blur-sm"
                  style={{ transform: 'rotateX(90deg) translateZ(128px)' }}
                />
                {/* Bottom face */}
                <div 
                  className="absolute w-64 h-64 bg-gradient-to-br from-pink-500/30 to-rose-500/30 border-2 border-pink-400/50 backdrop-blur-sm"
                  style={{ transform: 'rotateX(-90deg) translateZ(128px)' }}
                />
              </div>
            </div>
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            
            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
              <p className="text-sm text-gray-300">
                Drag to rotate • Scroll to zoom • Click controls to adjust view
              </p>
            </div>
          </div>

          {/* Model Info */}
          <div className="p-4 border-t border-white/10 bg-slate-900/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">Vertices</p>
                <p className="text-lg font-bold text-white">1,248</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Faces</p>
                <p className="text-lg font-bold text-white">2,496</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Size</p>
                <p className="text-lg font-bold text-white">50×50×50mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/2 flex flex-col bg-slate-900">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">AI Conversation</h2>
            <p className="text-sm text-gray-400 mt-1">Chat with AI to create and refine your 3D models</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                <div className="bg-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe the 3D model you want to create..."
                disabled={isGenerating}
                className="flex-1 bg-slate-800 border-white/10 text-white placeholder-gray-500"
              />
              <Button
                type="submit"
                disabled={isGenerating || !inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Try: "Create a gear with 12 teeth" or "Design a coffee mug"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage

