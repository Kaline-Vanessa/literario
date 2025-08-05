import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Star, Upload, Calendar, BookOpen, Heart, Quote } from 'lucide-react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [uploadedImages, setUploadedImages] = useState({})

  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]

  const sections = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen },
    { id: 'estante', label: 'Estante', icon: BookOpen },
    { id: 'desafios', label: 'Desafios', icon: Calendar },
    { id: 'tbr', label: 'TBR', icon: BookOpen },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
    { id: 'citacoes', label: 'Citações', icon: Quote },
    { id: 'dias-leitura', label: 'Dias de Leitura', icon: Calendar },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ]

  const handleImageUpload = async (event, bookId) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('book_id', bookId)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (result.success) {
          setUploadedImages(prev => ({
            ...prev,
            [bookId]: result.file_url
          }))
        } else {
          alert('Erro ao fazer upload: ' + result.error)
        }
      } catch (error) {
        console.error('Erro ao fazer upload:', error)
        alert('Erro ao fazer upload da imagem')
      }
    }
  }

  const renderBookCard = (bookId, index) => (
    <Card key={bookId} className="relative group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center relative overflow-hidden">
          {uploadedImages[bookId] ? (
            <img 
              src={uploadedImages[bookId]} 
              alt={`Capa do livro ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Adicionar capa</p>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, bookId)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        <div className="flex justify-center mt-2 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderHomeSection = () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {[
        { id: 'biblioteca', label: 'Biblioteca', color: 'bg-green-200', icon: '📚' },
        { id: 'estante', label: 'Estante', color: 'bg-blue-200', icon: '📖' },
        { id: 'desafios', label: 'Desafios', color: 'bg-orange-200', icon: '🎯' },
        { id: 'tbr', label: 'TBR', color: 'bg-purple-200', icon: '📝' },
        { id: 'favoritos', label: 'Favoritos', color: 'bg-pink-200', icon: '❤️' },
        { id: 'citacoes', label: 'Citações', color: 'bg-green-200', icon: '💬' },
        { id: 'dias-leitura', label: 'Dias de Leitura', color: 'bg-blue-200', icon: '📅' },
        { id: 'wishlist', label: 'Wishlist', color: 'bg-purple-200', icon: '🏠' }
      ].map((item) => (
        <Card 
          key={item.id}
          className={`${item.color} cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-gray-300`}
          onClick={() => setCurrentSection(item.id)}
        >
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="font-semibold text-gray-800">{item.label}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderBibliotecaSection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Biblioteca</h2>
        <p className="text-gray-600">Organize suas leituras por mês</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        {Array.from({ length: 9 }, (_, i) => renderBookCard(`biblioteca-${i}`, i))}
      </div>
      
      <div className="flex justify-center space-x-2 mt-6">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={index < 7 ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )

  const renderGenericSection = (sectionId, title) => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">Adicione suas capas de livros</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        {Array.from({ length: 9 }, (_, i) => renderBookCard(`${sectionId}-${i}`, i))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">PLANNER LITERÁRIO</h1>
            <Button 
              onClick={() => setCurrentSection('home')}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Início
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2">
          {months.map((month, index) => (
            <Button
              key={month}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              {month}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentSection === 'home' && renderHomeSection()}
        {currentSection === 'biblioteca' && renderBibliotecaSection()}
        {currentSection === 'estante' && renderGenericSection('estante', 'Estante')}
        {currentSection === 'desafios' && renderGenericSection('desafios', 'Desafios')}
        {currentSection === 'tbr' && renderGenericSection('tbr', 'TBR - To Be Read')}
        {currentSection === 'favoritos' && renderGenericSection('favoritos', 'Favoritos')}
        {currentSection === 'citacoes' && renderGenericSection('citacoes', 'Citações')}
        {currentSection === 'dias-leitura' && renderGenericSection('dias-leitura', 'Dias de Leitura')}
        {currentSection === 'wishlist' && renderGenericSection('wishlist', 'Wishlist')}
      </main>
    </div>
  )
}

export default App

