import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="text-4xl md:text-7xl text-center pb-5 font-bold tracking-tight">
        Share your Gossip Anonymously
      </div>
      <div className="text-center text-foreground/70 max-w-lg md:max-w-3xl md:text-2xl leading-relaxed">
        Talk about your teachers, your crush, and everything in between. Stay
        anonymous, spill the tea, and enjoy the buzz!
      </div>
      <Link
        href={"/gossip"}
        className="bg-white text-black px-6 py-2 md:px-12 md:py-4 md:text-2xl rounded-lg text-xl mt-10 transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        Get Started
      </Link>
      <div className="text-foreground/60 mt-3 text-sm md:text-base">
        Trusted by HU students
      </div>
    </div>
  );
}
