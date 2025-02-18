import { useState } from 'react';
import { Property } from '../utils/parseProperties_Gica';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm: React.FC<{ property: Property }> = ({ property }) => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const siteKey: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    id: property.id,
    ref: property.ref,
    sentAt: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }), // Capture date & time
    recaptchaToken,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('siteKey', siteKey);
    // console.log('Waiting for reCAPTCHA to load...');
    const waitForGrecaptcha = () =>
      new Promise<void>((resolve) => {
        if (window.grecaptcha) {
          resolve();
        } else {
          setTimeout(() => {
            waitForGrecaptcha().then(resolve);
          }, 500); // Retry every 500ms
        }
      });

    await waitForGrecaptcha(); // ✅ Waits until grecaptcha is available
    console.log('reCAPTCHA is loaded:', window.grecaptcha);

    try {
      // console.log('Executing reCAPTCHA...'); // ✅ ADD THIS
      // console.log(siteKey);
      const recaptchaToken = await window.grecaptcha.execute(siteKey, {
        action: 'submit',
      });
      console.log('recaptchaToken', recaptchaToken);
    } catch (error) {
      console.error('reCAPTCHA execute() failed:', error); // ✅ ADD THIS
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      if (response.ok) {
        toast.success('Sus datos han sido enviados. Gracias!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('No se han podido enviar sus datos. Pruebe de nuevo!.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      toast.error('Ha ocurrido un error. Pruebe de nuevo!.', {
        position: 'top-right',
        autoClose: 3000,
      });
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
      <ReCAPTCHA
        // sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={(token) => setRecaptchaToken(token || '')}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Enviar
      </button>
      {/* ✅ ToastContainer at the bottom of ContactForm */}
      <ToastContainer autoClose={3000} />
    </form>
  );
};

export default ContactForm;
