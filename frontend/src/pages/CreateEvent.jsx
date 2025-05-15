import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../services/eventService'

export default function CreateEvent() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    total_seats: ''
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('date', form.date)
      formData.append('location', form.location)
      formData.append('total_seats', parseInt(form.total_seats, 10))
      formData.append('image', image)

      await createEvent(formData)
      setSuccess('Événement créé avec succès !')
      setTimeout(() => navigate('/admin/events'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center">Créer un événement</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded text-white placeholder-gray-400"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Lieu"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded text-white placeholder-gray-400"
          />
          <input
            type="number"
            name="total_seats"
            placeholder="Nombre de places"
            value={form.total_seats}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded text-white placeholder-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:brightness-110"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Aperçu" className="w-full h-48 object-cover rounded" />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full font-semibold hover:brightness-110 transition"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  )
}
