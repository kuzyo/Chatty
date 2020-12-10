import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href="http://localhost:4000/auth/google">Singin with google</a>
    </div>
  );
}
