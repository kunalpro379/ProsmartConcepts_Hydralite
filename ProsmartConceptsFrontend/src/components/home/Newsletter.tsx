import catRespiratory from "@/assets/prosmart_logo.jpeg";

const Newsletter = () => {

  return (
    <section className="relative z-20 py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative bg- rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 overflow-hidden shadow">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Content */}
            <div className="relative z-10">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0f3d1f] mb-2 sm:mb-3">Know about the Founder</p>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Atul Anand
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 mb-4 max-w-3xl leading-relaxed">
                Atul Anand is the Founder & CEO of Prosmart Concepts, a Mumbai-based enterprise specialising in healthcare, medical supplies and import of special & general products. With a vision to bridge the gap between global standards and local Indian markets, Atul embarked on this entrepreneurial journey to deliver high-quality healthcare-related products and services with integrity and responsiveness. His leadership has anchored the firm in a dynamic, fast-changing industry landscape.
              </p>
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold">
                <span className="text-[#0f3d1f]">GlobalLinker</span>
                <span className="text-gray-500">+1</span>
              </div>
            </div>
            
            {/* Image */}
            <div className="hidden lg:flex justify-end">
              <img 
                src={catRespiratory}
                alt="Newsletter"
                className="w-64 h-64 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
