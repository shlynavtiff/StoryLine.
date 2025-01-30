import HeaderSignin from "@/components/HeaderSignin";
import Footer from "@/components/Footer";
import UserGreetText from "@/components/UserGreetText";

export default function Home() {
  return (
    <div className="flex flex-col bg-hero-bg justify-between min-h-screen">
      {/* Header */}
      <HeaderSignin />

      {/* Main Content with Background Image */}
      <div
        className="flex flex-col gap-4 px-4 items-center justify-center h-[90dvh] borat"
      >
        <div className="min-w-[280px] text-center">
          <h1 className="font-semibold text-6xl sm:text-7xl">
            Headlines, Stories & Ideas.
          </h1>
        </div>
        <div className="text-lg">
          A place to read, write, and deepen your understanding.
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-[#242424] py-3 px-6 rounded-full cursor-pointer text-white border-[1px] border-[#414141] hover:bg-[#414141] max-w-[150px]">
            Start reading
          </button>
          <button className="bg-[#242424] py-3 px-6 rounded-full cursor-pointer text-white border-[1px] border-[#414141] hover:bg-[#414141] hidden md:block">
            Our story
          </button>

          <UserGreetText/>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}