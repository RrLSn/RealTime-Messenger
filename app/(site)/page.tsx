import Image from "next/image";

export default function Home() {
    return (
      <div className="min-h-full flex flex-col justify-center py-12 bg-gray-100 items-center">
        <Image src='/images/logo.png' height={48} width={48} alt="logo" />
        <h2>Signup to your account</h2>
      </div>
    )
  }