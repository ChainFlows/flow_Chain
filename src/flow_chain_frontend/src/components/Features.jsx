import React from 'react';

export default function Features() {
  const features = [
    { id: '01', title: 'Transport Logistics' },
    { id: '02', title: 'Cargo Terminal' },
    { id: '03', title: 'Temporary storage warehouse' },
    { id: '04', title: 'Industrial Park Sale and lease of land', highlight: true },
    { id: '05', title: 'Cargo Customs Clearance' },
    { id: '06', title: 'Manipulation' },
    { id: '07', title: 'Warehouse' },
  ];

  return (
    <div className="container mx-auto py-24">
      <h2 className="text-5xl mb-16">
        <span className="text-red-500">Everything</span> you<br />
        need we have!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className={`p-8 rounded-2xl ${
              feature.highlight 
                ? 'bg-blue-900 text-white' 
                : 'bg-gray-50'
            }`}
          >
            <div className="text-xl mb-4">{feature.id}</div>
            <h3 className="text-lg">{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}