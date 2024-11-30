import React, { useState } from 'react';
import { Play } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Partners() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const partners = [
    { name: 'Naviok', logo: '/logos/naviok.png' },
    { name: 'Oculus', logo: '/logos/oculus.png' },
    { name: 'Samsung', logo: '/logos/samsung.png' },
    { name: 'SQLite', logo: '/logos/sqlite.png' },
    { name: 'LinkedIn', logo: '/logos/linkedin.png' },
    { name: 'Chamilo', logo: '/logos/chamilo.png' },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12">
          {/* Partners Logo Row */}
          <div className="flex flex-wrap justify-between items-center mb-12">
            {partners.map((partner, index) => (
              <img
                key={index}
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 object-contain filter brightness-0 invert"
              />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/truck.jpg" alt="Delivery Truck" className="rounded-2xl w-full h-full object-cover" />
              <img src="/images/crane.jpg" alt="Port Crane" className="rounded-2xl w-full h-full object-cover" />
              <img src="/images/forklift.jpg" alt="Forklift" className="rounded-2xl w-full h-full object-cover" />
              <img src="/images/container.jpg" alt="Container" className="rounded-2xl w-full h-full object-cover" />
            </div>

            <div className="text-white">
              <h2 className="text-4xl md:text-5xl mb-4">
                We are<br />
                <span className="text-red-500">#1 Logistics</span><br />
                WORLDWIDE
              </h2>
              <p className="text-gray-200 mb-8">
                We are an international scale company that has been trusted by all corners of the world. Use our company to expedite your package delivery!
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-white text-blue-900 rounded-full">
                  GET IN TOUCH
                </button>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-8 py-3 border border-white rounded-full flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}