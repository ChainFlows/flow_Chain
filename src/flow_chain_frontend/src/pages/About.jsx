import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Globe, ArrowRight } from 'lucide-react';

export default function About() {
  const features = [
    'Predictive Demand Modeling',
    'Optimized Routing Solutions',
    'Transparent Resource Allocation'
  ];

  const faqs = [
    {
      question: 'How can stakeholders access information?',
      answer: 'Description',
      date: 'Dec 14, 2023'
    },
    {
      question: 'What technology do we use for tracking?',
      answer: 'Description',
      date: 'Dec 14, 2023'
    },
    {
      question: 'How do you prioritize resource distribution?',
      answer: 'Description',
      date: 'Dec 14, 2023'
    },
    {
      question: 'What makes Chain Flow unique?',
      answer: 'Description',
      date: 'Dec 14, 2023'
    },
    {
      question: 'How does AI enhance our operations?',
      answer: 'Description',
      date: 'Dec 14, 2023'
    }
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl mb-6">
              Empowering Humanitarian <span className="text-red-500">Aid</span><br />
              with Innovative Technology
            </h1>
            <button className="px-8 py-3 bg-blue-900 text-white rounded-full">
              GET STARTED
            </button>

            <div className="mt-12 space-y-6">
              <div>
                <div className="text-red-500 text-3xl">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl">8+</div>
                <div className="text-sm">Different countries</div>
              </div>
              <div>
                <div className="text-3xl">4+</div>
                <div className="text-sm">Types of services</div>
              </div>
            </div>

            <div className="mt-12 flex gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <img 
              src="/container-image.png" 
              alt="ChainFlow Container" 
              className="w-full h-auto rounded-lg"
            />
            <p className="absolute top-8 right-8 max-w-[280px] text-right text-sm">
              We're pioneering humanitarian logistics through advanced tech, ensuring timely and effective assistance in crisis situations.
            </p>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl mb-6">
              Revolutionizing Logistics with<br />
              <span className="text-red-500">Blockchain</span> and <span className="text-red-500">AI</span>
            </h2>
            <p className="mb-6 text-gray-600">
              ChainFlow combines cutting-edge technology to enhance humanitarian logistics and supply chain management, ensuring timely and effective assistance in crisis situations.
            </p>
            <button className="px-8 py-3 bg-blue-900 text-white rounded-full flex items-center gap-2">
              JOIN THE REVOLUTION <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/logistics-illustration.png" 
              alt="Logistics Innovation" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-4xl mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg">{faq.question}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{faq.date}</span>
                  <button className="text-blue-900">See more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}