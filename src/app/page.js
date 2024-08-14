import LandingPage from "@/components/LandingPage";
import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <Nav/>
      <LandingPage/>
    </div>
  );
}
