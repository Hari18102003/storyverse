import About from "@/components/About";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";

export default function Home() {
  return (
    <div className=" flex flex-col gap-5 px-2 md:px-16">
      <Hero />
      <Latest />
      <About />
    </div>
  );
}
