import { useState } from 'react'
import CanvasBackground from '../components/CanvasBackground'

const questions = [
  {
    question: "Comment puis-je réserver un événement ?",
    answer: "Connectez-vous à votre compte, puis cliquez sur le bouton 'Réserver' d’un événement pour réserver une place."
  },
  {
    question: "Comment puis-je voir mes réservations ?",
    answer: "Une fois connecté, accédez à la page 'Mes réservations' depuis la barre de navigation."
  },
  {
    question: "Puis-je annuler une réservation ?",
    answer: "Pour le moment, les annulations ne sont pas prises en charge depuis l'interface. Contactez un administrateur si besoin."
  },
  {
    question: "Comment créer un événement ?",
    answer: "Seuls les administrateurs peuvent créer des événements via l’espace admin."
  }
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CanvasBackground />

      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Foire aux Questions</h1>

        {questions.map((q, i) => (
          <div key={i} className="mb-4 border border-gray-700 rounded-md overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-4 py-3 bg-black hover:bg-gray-700 font-medium transition"
            >
              {q.question}
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 bg-gray-900 border-t border-gray-700 text-gray-300">
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
