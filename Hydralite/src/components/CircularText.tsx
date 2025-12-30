interface CircularTextProps {
  text: string;
  className?: string;
}

const CircularText = ({ text, className }: CircularTextProps) => {
  const characters = text.split('');
  const radius = 50;
  
  return (
    <div className={`relative w-32 h-32 animate-spin-slow ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
          />
        </defs>
        <text className="text-[11px] fill-foreground uppercase tracking-[0.3em] font-normal">
          <textPath href="#circlePath">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-foreground" />
      </div>
    </div>
  );
};

export default CircularText;
