
import { FC } from "react";
import { Connect } from '../../components/Connect';
import { Getter } from '../../components/Getter';
import { Setter } from '../../components/Setter';

export const HogeView: FC = ({ }) => {

  return (
<div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Hoge
        </h1>
        <div className="text-center">
          <Connect/>
          <Getter/>
          <Setter/>
        </div>
      </div>
    </div>
  );
};
