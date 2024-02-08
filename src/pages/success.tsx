import type { NextPage } from "next";
import Head from "next/head";
import { SuccessView } from "../views";

const Success: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Congratulations! · Talk.xyz</title>
        <meta
          name="description"
          content="Great job, you now own a Talk founders pass!"
        />
      </Head>
      <SuccessView />
    </div>
  );
};

export default Success;
