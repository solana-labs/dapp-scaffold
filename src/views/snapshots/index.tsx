import {FC} from "react";
import SnapshotList from "../../components/Snapshot";

export const SnapshotsView: FC = ({}) => {

    return (
        <div className="mx-auto p-4">
            <div >
                <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                    Overview
                </h1>
                 {/*CONTENT GOES HERE */}
                <div className="text-center">
                    <SnapshotList/>
                </div>
            </div>
        </div>
    );
};
