import React from 'react';

const categories = [
    {
      title: "Hot Coffee",
      image: "hotcoffee.jpg",
      description: "Classic brews & espresso drinks"
    },
    {
      title: "Iced Coffee",
      image: "icedcoffee.jpg",
      description: "Refreshing cold coffee options"
    },
    {
      title: "Non-Coffee Drinks",
      image: "noncoffee.jpg",
      description: "Smoothies & specialty beverages"
    },
    {
      title: "Tea Infusion",
      image: "teainfusion.jpg",
      description: "Aromatic tea selections"
    }
  ];
  
const VideoSection = () => {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="process.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/3 space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Enjoy a new blend of coffee style
              </h2>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Explore all flavours of coffee with us. There is always a new cup worth experiencing
              </p>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                {/* Testimonial Section */}
                <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="testimonialphoto.jpg"
                      alt="Food Critic"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">Sarah Matthews</h3>
                      <p className="text-white text-sm opacity-75">Food & Beverage Critic, Culinary Globe</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="text-white italic">
                    "Bean Scene's commitment to sustainable coffee isn't just admirable—it's delicious. Their signature blend offers a perfect balance of boldness and subtle notes, while their innovative approach to eco-friendly practices sets a new standard in the industry. A must-visit for any serious coffee enthusiast."
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-customBrown text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-semibold">
                  Explore Our Menu
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-400"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

export default VideoSection;
