import Image from "next/image";
import styles from '@/app/styles/page.module.css'
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
      <div className={styles.wrapper}>
        <div>
            <Image src='/images/logo.png' height={48} width={48} alt="logo" className="mx-auto w-auto" />
            <h2 className="text-2xl text-gray-900 tracking-tighter font-bold mt-5">Sign in to your account</h2>
        </div>
        <AuthForm />
      </div>
    )
  }