"use client";

import React, { useState, useEffect } from "react";

const GradientProgress = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (value) {
      const index = options.findIndex((option) => option.value === value);
      setSelected(index !== -1 ? index : -1);
    } else {
      setSelected(-1); // Reset when value is empty or undefined
    }
  }, [value, options]);

  const handleSelect = (index) => {
    setSelected(index);
    onChange(options[index].value);
  };

  const gradientOptions = [
    {
      gradient: "from-blue-300 to-blue-500",
      glow: "bg-blue-500/20",
      baseSize: "size-3",
    },
    {
      gradient: "from-blue-500 via-purple-500 to-purple-600",
      glow: "bg-purple-500/20",
      baseSize: "size-[0.9rem] md:size-4",
    },
    {
      gradient: "from-purple-600 via-pink-500 to-red-500",
      glow: "bg-pink-500/20",
      baseSize: "size-[1.1rem] md:size-5",
    },
    {
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      glow: "bg-orange-500/20",
      baseSize: "size-[1.3rem] md:size-6",
    },
    {
      gradient: "from-yellow-500 to-yellow-300",
      glow: "bg-yellow-400/20",
      baseSize: "size-[1.5rem] md:size-7",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-12 my-2 md:my-5">
      <div className="relative">
        {/* Progress Bar Container */}
        <div className="flex items-center justify-between p-4 rounded-full bg-none border-2">
          {options.map((option, i) => (
            <React.Fragment key={i}>
              {/* Dot Container */}
              <div className="flex flex-col items-center">
                {/* Main dot */}
                <div
                  onClick={() => handleSelect(i)}
                  className={`${
                    gradientOptions[i].baseSize
                  } rounded-full cursor-pointer transition-colors duration-300 z-10
                    ${
                      i <= selected
                        ? `bg-gradient-to-r ${gradientOptions[i].gradient}`
                        : "bg-gray-600"
                    }`}
                />
              </div>

              {/* Connector Line */}
              {i < options.length - 1 && (
                <div className="flex-1 mx-1 md:mx-3">
                  <div
                    className={`h-1 md:h-1.5 rounded-full transition-all duration-300
                      ${
                        i < selected
                          ? `bg-gradient-to-r ${
                              gradientOptions[i + 1].gradient
                            }`
                          : "bg-gray-600"
                      }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Labels Container - Positioned absolutely */}
        <div className="absolute w-full flex justify-between px-4 mt-2">
          {options.map((option, i) => (
            <div key={i} className="text-xl md:text-3xl font-medium">
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientProgress;