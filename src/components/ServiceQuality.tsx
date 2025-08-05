import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import quoteIcon from '../assets/quote-icon.svg';

const QualitiesSection = () => {
  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    if (!token) {
      alert("Please verify that you are not a robot.");
      return;
    }

    // Proceed with form submission or send to backend
    console.log("reCAPTCHA token:", token);
  };

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <h2 className="text-3xl font-bold mb-12 border-b-4 border-blue-500 inline-block">Qualities</h2>

      <div className="grid md:grid-cols-3 gap-10">
      {/* Quality 1 */}
        <div className="border-r border-gray-300 pr-6">
          <div className="text-5xl text-gray-400 font-bold mb-4">1</div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Exquisite Elegance</h3>
          <p className="text-gray-600 text-sm">
            Our Villa Designs Aren’t Just Homes; They’re Meticulously Crafted Masterpieces Of Exquisite Elegance. We Blend Luxurious Aesthetics With Unparalleled Attention To Detail, Ensuring Every Element Culminates In A Timeless, Sophisticated Living Space That Perfectly Reflects Our Clients' Discerning Tastes.
          </p>
        </div>

        {/* Quality 2 */}
        <div className="border-r border-gray-300 pr-6">
          <div className="text-5xl text-gray-400 font-bold mb-4">2</div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Seamless Serenity</h3>
          <p className="text-gray-600 text-sm">
            In Our Villa Designs, We Aim To Capture The Essence Of Serenity, Meticulously Crafting Spaces Where Nature And Architecture Intertwine To Offer Clients A Truly Peaceful Retreat. Every Villa Is A Testament To Thoughtful Design, Fostering An Environment Of Calm And Relaxation For An Unparalleled Serene Living Experience.
          </p>
        </div>

        {/* Quality 3 */}
        <div>
          <div className="text-5xl text-gray-400 font-bold mb-4">3</div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Unparalleled Craftsmanship</h3>
          <p className="text-gray-600 text-sm">
            Ansaf Cont Stands For Unparalleled Craftsmanship. Our Skilled Artisans And Designers Use Innovative Techniques And The Finest Materials To Create Villas Of Exceptional Quality And Beauty. Every Detail From Intricate Woodwork To Exquisite Finishes Reflects Our Deep Dedication To The Art Of Building.
          </p>
        </div>
      </div>
      

      {/* Quote Section */}
      <div className="mt-20 bg-blue-900 text-white py-12 px-6 md:px-16 rounded-lg">
        <h3 className="text-xl md:text-2xl font-semibold mb-8">
          "Experience high-quality work delivered with excellence and timeliness; request your quote today."
        </h3>
        <form className="grid md:grid-cols-3 gap-4 items-end" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2">Enter your Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white text-black"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Enter your Email Address</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-white text-black"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="bg-white text-blue-900 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              REQUEST A QUOTE →
            </button>
          </div>

          {/* CAPTCHA */}
          <div className="col-span-3 mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfS5JcrAAAAAN9F_-CE1f1zxi2cdmA1gOVaGuKA" // replace with actual site key
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default QualitiesSection;
