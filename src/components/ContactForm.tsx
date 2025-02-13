import { useState } from 'react';
import { Property } from '../utils/parseProperties_Gica';

const ContactForm: React.FC<{ property: Property }> = ({ property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    id: property.id,
    ref: property.ref,
    sentAt: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }), // Capture date & time
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] mx-auto bg-white p-4 shadow-md rounded-md"
    >
      <label htmlFor="name" className="text-green-800 font-semibold">
        Nombre
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Su nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <label htmlFor="email" className="text-green-800 font-semibold">
        E-mail
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <label htmlFor="name" className="text-green-800 font-semibold">
        Teléfono
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <label htmlFor="name" className="text-green-800 font-semibold">
        Mensaje
      </label>
      <textarea
        name="message"
        id="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={4}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
