import { useEffect, useState } from 'react';

const SustainableApproachSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('sustainable-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInRight 1s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>

      <section id="sustainable-section" className="bg-customYellow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className={`w-full lg:w-1/2 space-y-6 text-center lg:text-left opacity-0 ${isVisible ? 'slide-in-left' : ''}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-customBrown">
                Our Sustainable Approach
              </h2>
              <p className={`text-base sm:text-lg text-gray-800 leading-relaxed opacity-0 ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
                Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and build your mood.
                Having a cup of coffee is good, but having a cup of real coffee is greater.
                There is no doubt that you will enjoy this coffee more than others you have ever tasted.
                We believe that great coffee can transform your day, energizing you to take on challenges and elevating your mood.
                Come visit us at Bean Scene and experience the difference for yourself!
                Your perfect cup of coffee awaits YOU.
              </p>
              <div className={`pt-6 opacity-0 ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
                <button className="bg-customBrown text-white px-8 py-3 rounded-full hover:bg-opacity-90 hover:scale-105 transform transition-all duration-300 font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className={`w-full lg:w-1/2 flex justify-center opacity-0 ${isVisible ? 'slide-in-right' : ''}`}>
              <img 
                className="w-full max-w-md object-cover hover:scale-105 transform transition-all duration-300"
                alt="Coffee"
                src="/coffeebag.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SustainableApproachSection;