'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  subscribe: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((res) => setTimeout(res, 1000));
    reset();
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FF5A5F] text-center mb-2">Contact Us</h1>
        <p className="text-gray-700 text-center mb-10">
          We're here to help with any questions about CrownVote. Reach out to our team for support, feedback, or suggestions.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                    placeholder="Enter your first name"
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                    placeholder="Enter your last name"
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                  placeholder="Enter your email address"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                  placeholder="What is your message about?"
                  {...register('subject')}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                  placeholder="Type your message here..."
                  {...register('message')}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="mr-2"
                  {...register('subscribe')}
                />
                <label htmlFor="subscribe" className="text-gray-700 text-sm">
                  Subscribe to our newsletter for updates
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Message'}
              </button>
              {isSubmitSuccessful && (
                <p className="text-green-600 text-center mt-2 font-semibold">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="flex items-start mb-3">
                <span className="text-[#FF5A5F] text-xl mr-3">📍</span>
                <div>
                  <div className="font-semibold text-gray-900">Main Office</div>
                  <div className="text-gray-700 text-sm">
                    Westlands Business Park, 3rd Floor<br />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <span className="text-[#FF5A5F] text-xl mr-3">📞</span>
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-700 text-sm">
                    +254 712 345 678<br />
                    +254 733 987 654
                  </div>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <span className="text-[#FF5A5F] text-xl mr-3">✉️</span>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-700 text-sm">
                    info@crownvote.co.ke<br />
                    support@crownvote.co.ke
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF5A5F] text-xl mr-3">⏰</span>
                <div>
                  <div className="font-semibold text-gray-900">Business Hours</div>
                  <div className="text-gray-700 text-sm">
                    Monday - Friday: 8:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM
                  </div>
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div className="bg-[#FFE5E5] rounded-2xl shadow p-6">
              <h3 className="text-lg font-bold text-[#FF5A5F] mb-3">Connect With Us</h3>
              <p className="text-gray-700 text-sm mb-4">
                Follow us on social media for the latest updates on Miss Kenya pageants and voting.
              </p>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="text-[#FF5A5F] hover:text-[#E31C5F]" aria-label="Facebook"><i className="fab fa-facebook-square"></i></a>
                <a href="#" className="text-[#FF5A5F] hover:text-[#E31C5F]" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-[#FF5A5F] hover:text-[#E31C5F]" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-[#FF5A5F] hover:text-[#E31C5F]" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
