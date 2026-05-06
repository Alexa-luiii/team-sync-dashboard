import { Users } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[100] animate-fade-out">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-blue-600 p-6 rounded-2xl shadow-2xl shadow-blue-200 animate-bounce-slow">
          <Users className="text-white w-16 h-16" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter animate-pulse-fast">
          Team Sync
        </h1>
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-blue-600 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
