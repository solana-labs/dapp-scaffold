
import { FC } from "react";
import { SayHello } from '../../components/SayHello';

export const HelloView = ({  }) => {

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Hello World Contract
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <SayHello />
        </div>
      </div>
    </div>
  );
};
