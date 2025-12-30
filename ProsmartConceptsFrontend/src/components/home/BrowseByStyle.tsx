import { Link } from "react-router-dom";
import catBoneJoint from "@/assets/cat-bone-joint.png";
import catDiabetes from "@/assets/cat-diabetes.png";
import catKidney from "@/assets/cat-kidney.png";
import catHeart from "@/assets/cat-heart.png";

const styles = [
  { name: "Home Care", image: catBoneJoint, bg: "bg-gradient-to-br from-rose-100 to-rose-50" },
  { name: "Hospital Use", image: catDiabetes, bg: "bg-gradient-to-br from-amber-100 to-amber-50" },
  { name: "Emergency", image: catKidney, bg: "bg-gradient-to-br from-emerald-100 to-emerald-50" },
  { name: "Wellness", image: catHeart, bg: "bg-gradient-to-br from-sky-100 to-sky-50" },
];

const BrowseByStyle = () => {
  return (
    <section className="relative z-20 py-12 lg:py-20 bg-gray-100 rounded-t-[3rem]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-4xl font-black text-gray-900">
            BROWSE BY <span className="text-cyan-500">care</span> STYLE
          </h2>
        </div>

        {/* Style Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {styles.map((style, index) => (
            <Link
              key={style.name}
              to="/products"
              className={`group relative ${style.bg} rounded-3xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-end p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={style.image}
                alt={style.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full">
                <span className="font-bold text-sm text-gray-900">{style.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyle;
