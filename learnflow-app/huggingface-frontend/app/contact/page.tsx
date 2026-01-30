'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'support@learnflow.com', href: 'mailto:support@learnflow.com' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: '📍', label: 'Address', value: '123 Learning Street, San Francisco, CA 94102', href: '#' },
  ];

  const faqs = [
    { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions.' },
    { q: 'Can I get a refund?', a: 'Yes, we offer a 30-day money-back guarantee on all courses.' },
    { q: 'How do I contact my instructor?', a: 'Use the chat feature in your course dashboard to message your instructor.' },
    { q: 'Is there a mobile app?', a: 'Our mobile app is coming soon! Currently, our website works great on mobile browsers.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-warmgray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-warmgray-900">LearnFlow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Courses', href: '/courses' },
                { name: 'About', href: '/about' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    item.name === 'Contact'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-warmgray-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/register" className="text-warmgray-700 hover:text-teal-700 font-medium text-sm">
                Sign Up
              </Link>
              <Link href="/" className="bg-teal-600 text-white px-5 py-2.5 rounded-full hover:bg-teal-700 transition-all font-medium text-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-4">
            Get in <span className="text-teal-600">Touch</span>
          </h1>
          <p className="text-lg text-warmgray-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all text-center group"
              >
                <div className="text-4xl mb-3">{info.icon}</div>
                <div className="text-sm text-warmgray-500 mb-1">{info.label}</div>
                <div className="font-medium text-warmgray-900 group-hover:text-teal-600 transition-colors">
                  {info.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQs */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Message Sent!</h3>
                  <p className="text-warmgray-600 mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-teal-600 font-medium hover:text-teal-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-warmgray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-warmgray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warmgray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-warmgray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warmgray-700 mb-2">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-warmgray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warmgray-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-warmgray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-soft">
                    <h3 className="font-semibold text-warmgray-900 mb-2">{faq.q}</h3>
                    <p className="text-warmgray-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 bg-gradient-to-br from-teal-500 to-sage-500 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'YouTube', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
