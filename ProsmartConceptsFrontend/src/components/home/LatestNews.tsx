import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import catEye from "@/assets/cat-eye.png";
import catHeart from "@/assets/cat-heart.png";
import catKidney from "@/assets/cat-kidney.png";

const articles = [
  {
    id: 1,
    title: "Transform your home healthcare",
    excerpt: "Learn how modern medical equipment can improve quality of care at home.",
    date: "Dec 5, 2024",
    image: catEye,
    category: "Healthcare Tips",
  },
  {
    id: 2,
    title: "Modern respiratory care solutions",
    excerpt: "Discover the latest innovations in respiratory care equipment.",
    date: "Dec 3, 2024",
    image: catHeart,
    category: "Product News",
  },
  {
    id: 3,
    title: "How care. Styled beautifully.",
    excerpt: "Medical equipment that combines functionality with elegant design.",
    date: "Dec 1, 2024",
    image: catKidney,
    category: "Design",
  },
];

const LatestNews = () => {
  return (
    <section className="relative z-20 py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
            Latest News <span className="text-gray-400">& Articles</span>
          </h2>
          <Link 
            to="/products"
            className="text-sm font-bold text-gray-700 hover:text-gray-900 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to="/products"
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {article.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3" />
                {article.date}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-500 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
