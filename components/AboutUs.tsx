import React, { useState } from 'react';
import { Award, Users, Globe, Rocket, MessageSquare, Send } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
        setFeedback("");
        setEmail("");
        setSubmitted(false);
        alert("Thank you for your feedback!");
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="About Hero"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            We Are Kenya-Amazon
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging the gap between global sneaker culture and local innovation. We are more than just a store; we are a movement.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            To empower self-expression through footwear. Whether it's the latest performance gear for athletes or custom AI-generated art for creators, we deliver quality without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-500">Every pair is verified by our experts. No fakes, ever.</p>
          </div>
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-500">We support local artists and run clubs across Nairobi.</p>
          </div>
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Nationwide Delivery</h3>
            <p className="text-gray-500">From Mombasa to Kisumu, we deliver to your doorstep.</p>
          </div>
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Future Tech</h3>
            <p className="text-gray-500">Pioneering AI-driven design customization in Africa.</p>
          </div>
        </div>

        {/* Service Feedback Section */}
        <div className="bg-indigo-900 rounded-2xl overflow-hidden shadow-2xl">
           <div className="grid grid-cols-1 lg:grid-cols-2">
             <div className="p-10 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" /> Tell us what you think
                </h3>
                <p className="text-indigo-200 mb-6">
                    How was your experience shopping with us? Your feedback helps us improve our services and product selection.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                       type="email" 
                       placeholder="Your Email (Optional)" 
                       className="w-full bg-indigo-800 border border-indigo-700 rounded-lg p-3 text-white placeholder-indigo-400 focus:outline-none focus:border-white"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                    />
                    <textarea 
                       placeholder="Share your thoughts on our service..." 
                       rows={4}
                       required
                       className="w-full bg-indigo-800 border border-indigo-700 rounded-lg p-3 text-white placeholder-indigo-400 focus:outline-none focus:border-white"
                       value={feedback}
                       onChange={e => setFeedback(e.target.value)}
                    />
                    <button 
                       type="submit"
                       disabled={submitted}
                       className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
                    >
                       {submitted ? "Sending..." : "Submit Feedback"}
                       {!submitted && <Send className="w-4 h-4"/>}
                    </button>
                </form>
             </div>
             <div className="relative h-64 lg:h-auto">
                <img 
                   src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Feedback" 
                   className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};