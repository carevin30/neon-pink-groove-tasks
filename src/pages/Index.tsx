import TodoList from '@/components/TodoList';
import musicBg from '@/assets/music-neon-bg.jpg';

const Index = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${musicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <TodoList />
      </div>
      
      {/* Floating musical notes animation */}
      <div className="absolute top-20 left-10 text-primary/20 animate-bounce">♪</div>
      <div className="absolute top-40 right-20 text-accent/20 animate-bounce delay-300">♫</div>
      <div className="absolute bottom-32 left-20 text-primary/20 animate-bounce delay-700">♪</div>
      <div className="absolute bottom-20 right-32 text-accent/20 animate-bounce delay-500">♬</div>
    </div>
  );
};

export default Index;
