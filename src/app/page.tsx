import Image from "next/image";
import backdrop from '../app/assets/fqYksMf.png'

export default function Home() {
  return (
    <div className="flex flex-row bg-hero-bg justify-center items-center h-screen ">
      <div className="flex flex-col gap-4">
        <div className="max-w-[280px]">
          <h1 className="font-semibold text-7xl">Headlines, Stories & Ideas.</h1>
        </div>
        <div className="text-lg">
          A place to read, write, and deepen your understanding.
        </div>
        <div>
          <button className='bg-[#242424] py-3 px-6  rounded-full cursor-pointer text-white  border-[1px]border-[#414141]  hover:bg-[#414141]'>
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
}
