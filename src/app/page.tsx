// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to AnnSampark</h1>
      <a 
      href="/ngo" 
      className="rounded-full bg-foreground text-background px-6 py-3 text-lg hover:bg-[#383838] transition-colors"
      >
      Get Started
      </a>
    </div>
  );
}
