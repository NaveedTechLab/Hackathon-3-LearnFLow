'use client';

import Link from 'next/link';

export default function AboutPage() {
  const team = [
    { name: 'Dr. Sarah Chen', role: 'Founder & CEO', image: '👩‍💼', bio: 'Former Google engineer with 15 years in EdTech' },
    { name: 'Muhammad Ali', role: 'Lead AI Engineer', image: '👨‍💻', bio: 'PhD in Machine Learning, Stanford University' },
    { name: 'Emily Rodriguez', role: 'Head of Curriculum', image: '👩‍🏫', bio: '10 years teaching Python at MIT' },
    { name: 'James Wilson', role: 'CTO', image: '👨‍🔬', bio: 'Built scalable systems at AWS and Netflix' },
  ];

  const values = [
    { icon: '🎯', title: 'Personalized Learning', description: 'AI adapts to your pace and learning style' },
    { icon: '🤝', title: 'Supportive Community', description: 'Learn alongside thousands of motivated students' },
    { icon: '💡', title: 'Practical Skills', description: 'Build real projects, not just theory' },
    { icon: '🚀', title: 'Career Growth', description: 'Skills that employers actually want' },
  ];

  const milestones = [
    { year: '2022', event: 'LearnFlow founded with a mission to democratize coding education' },
    { year: '2023', event: 'Launched AI tutoring system, reached 10,000 students' },
    { year: '2024', event: 'Expanded to 50+ countries, 100,000+ students enrolled' },
    { year: '2025', event: 'Introduced advanced debugging agent and teacher dashboard' },
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
                    item.name === 'About'
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-6">
            About <span className="text-teal-600">LearnFlow</span>
          </h1>
          <p className="text-xl text-warmgray-600 leading-relaxed">
            We're on a mission to make Python programming accessible to everyone through
            AI-powered personalized learning experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-warmgray-900 mb-6">Our Story</h2>
              <p className="text-warmgray-600 mb-4">
                LearnFlow was born from a simple observation: traditional coding education doesn't work for everyone.
                Students learn at different paces, have different backgrounds, and need different types of support.
              </p>
              <p className="text-warmgray-600 mb-4">
                We built LearnFlow to solve this problem. Our AI tutors adapt to each student's learning style,
                providing personalized explanations, debugging help, and practice exercises.
              </p>
              <p className="text-warmgray-600">
                Today, we're proud to help over 100,000 students worldwide learn Python effectively,
                with teacher dashboards that help educators identify and support struggling students.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-sage-500 rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">100K+</div>
                  <div className="text-teal-100">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">50+</div>
                  <div className="text-teal-100">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">95%</div>
                  <div className="text-teal-100">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">4.8</div>
                  <div className="text-teal-100">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-warmgray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-semibold text-warmgray-900 mb-2">{value.title}</h3>
                <p className="text-warmgray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-warmgray-900 text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-teal-600 font-bold">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 mt-1 bg-teal-500 rounded-full relative">
                  {index < milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-0.5 h-16 bg-teal-200 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-warmgray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-warmgray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft text-center hover:shadow-soft-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-warmgray-900">{member.name}</h3>
                <p className="text-teal-600 text-sm mb-2">{member.role}</p>
                <p className="text-warmgray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
          <p className="text-teal-100 mb-8">Start your Python journey today with AI-powered personalized learning.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-teal-700 px-8 py-3 rounded-full font-semibold hover:bg-cream-50 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
