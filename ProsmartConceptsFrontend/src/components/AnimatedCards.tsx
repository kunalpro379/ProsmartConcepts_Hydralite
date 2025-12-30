import { useEffect, useState } from "react";

interface AnimatedCardsProps {
  cards: {
    image: string;
    alt: string;
  }[];
  totalCards?: number;
  visibleCards?: number;
  interval?: number;
}

const AnimatedCards = ({ 
  cards, 
  totalCards = 10, 
  visibleCards = 6,
  interval = 1500 
}: AnimatedCardsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cards.length === 0) return;
    
    const autoSlide = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, interval);
    
    return () => clearInterval(autoSlide);
  }, [cards.length, interval]);

  const getCardStyle = (cardIndex: number): React.CSSProperties => {
    let position = cardIndex - activeIndex;
    
    if (position < -visibleCards / 2) position += cards.length;
    if (position > visibleCards / 2) position -= cards.length;

    const isVisible = Math.abs(position) <= visibleCards / 2;
    const scale = position === 0 ? 1 : Math.max(0.65, 1 - Math.abs(position) * 0.12);
    const zIndex = 10 - Math.abs(position);
    const translateX = position * 75;
    const translateZ = position === 0 ? 50 : -Math.abs(position) * 30;
    const rotateY = position * -8;
    const opacity = isVisible ? Math.max(0.5, 1 - Math.abs(position) * 0.18) : 0;

    return {
      transform: `perspective(1000px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      visibility: isVisible ? "visible" : "hidden",
      transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
    };
  };

  if (cards.length === 0) return null;

  return (
    <div 
      className="relative flex sm:items-start pt-6 lg:items-center justify-center h-[400px] lg:h-[450px] xl:h-[500px] w-full"
      style={{ 
        perspective: "1200px", 
        transformStyle: "preserve-3d",
        minWidth: "400px"
      }}
    >
      {cards.map((card, i) => {
        const style = getCardStyle(i);
        return (
          <div
            key={i}
            className="absolute w-56 h-64 lg:w-64 lg:h-72 xl:w-72 xl:h-80 rounded-2xl lg:rounded-3xl border-2 overflow-hidden"
            style={{
              ...style,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              background: "rgba(31, 30, 30, 1)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.31)",
              boxShadow: "0 20px 60px rgba(197, 192, 192, 0.2)",
            }}
          >
            <div className="w-full h-full p-4 lg:p-5 xl:p-6 flex flex-col items-center justify-center">
              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="mt-2 lg:mt-3 text-center">
                <p className="text-white text-xs lg:text-sm font-semibold drop-shadow-md">
                  {card.alt}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedCards;

