import Head from "next/head";
// import Image from "next/image";
import Navlogin from "../components/header/navlogin";
import Landing from "../components/landingPage/landing";
import Footer from "../components/footer/footer";
import Nav from "../components/header/nav";
import { useEffect, useState } from "react";

export default function Home() {
  const [login, setLogin] = useState();
  useEffect(() => {
    const login = localStorage.getItem("token");
    setLogin(login);
  }, []);

  if (!login) {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Navlogin />
          <Landing />
          <Footer />
        </main>
      </div>
    );
  }else{
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Nav />
          <Landing />
          <Footer />
        </main>
      </div>
    );
  }
}
