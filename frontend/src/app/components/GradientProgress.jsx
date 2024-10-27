import React, { useState } from 'react';

const GradientProgress = () => {
  const [selected, setSelected] = useState(0);
  
  const options = [
    { label: '1', gradient: 'from-blue-300 to-blue-500', glow: 'bg-blue-500/20', baseSize: 'w-3 h-3' },
    { label: '2', gradient: 'from-blue-500 via-purple-500 to-purple-600', glow: 'bg-purple-500/20', baseSize: 'w-4 h-4' },
    { label: '3', gradient: 'from-purple-600 via-pink-500 to-red-500', glow: 'bg-pink-500/20', baseSize: 'w-5 h-5' },
    { label: '4', gradient: 'from-red-500 via-orange-500 to-yellow-500', glow: 'bg-orange-500/20', baseSize: 'w-6 h-6' },
    { label: '5', gradient: 'from-yellow-500 to-yellow-300', glow: 'bg-yellow-400/20', baseSize: 'w-7 h-7' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-3 my-5">
      <div className="relative">
        {/* Progress Bar Container */}
        <div className="flex items-center justify-between p-4 rounded-full bg-none border-2">
          {options.map((option, i) => (
            <React.Fragment key={i}>
              {/* Dot with Radiating Effect */}
              <div className="relative">
                {/* Radiating circles - only show for selected */}
                {/* {i === selected && (
                  <>
                    Outer Glow            
                    <div className={`absolute -inset-6 rounded-full ${option.glow} animate-pulse`} />
                    Radiating lines
                    <div className="absolute -inset-4">
                      {[...Array(12)].map((_, index) => (
                        <div
                          key={index}
                          className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${option.gradient} rounded-lg`}
                          style={{
                            transformOrigin: 'center',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-1px',
                            marginTop: '-1px',
                            transform: `rotate(${index * 30}deg) translateY(-14px)`,
                            transformOrigin: '50% 50%'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )} */}
                
                {/* Main dot */}
                <div
                  onClick={() => setSelected(i)}
                  className={`${option.baseSize} rounded-full cursor-pointer transition-colors duration-300 relative z-10
                    ${i <= selected ? `bg-gradient-to-r ${option.gradient}` : 'bg-gray-600'}`}
                />
                
                {/* Label */}
                <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-3xl font-medium
                  ${i <= selected ? 'text-white' : 'text-gray-600'}`}>
                  {option.label}
                </div>
              </div>
              
              {/* Connector Line */}
              {i < options.length - 1 && (
                <div className="flex-1 mx-3">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300
                      ${i < selected ? `bg-gradient-to-r ${options[i + 1].gradient}` : 'bg-gray-600'}`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientProgress;