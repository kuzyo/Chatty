import Head from "next/head";
import {useUserQuery, User} from "../src/generated/graphql"

// const GET_CURRENT_USER = gql`
//   query getCurrentUser {
//     currentUser {
//       _id
//       name
//       image
//     }
//   }
// `;

export default function Home() {
  const { loading, error, data } = useUserQuery();
    console.log(data.currentUser.image)

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
