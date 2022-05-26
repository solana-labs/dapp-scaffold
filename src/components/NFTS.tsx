// import { FC } from 'react';
import React from 'react';

export const NFTS = (pops) => {

    return (
        <div className="column">



            <section className="mx-auto my-5 max_width abc">

                <div className="card">

                    <br />

                    <div>
                        <h5 className="card-title font-weight-bold mb-2 text-center">NFTS</h5>
                    </div>

                    <div className="bg-image hover-overlay pd" data-mdb-rippleripple rounded-0-color="light">
                        <img className="img-fluid  max_width image_width" src={pops.data}
                            alt="Card image cap" />

                    </div>
                    <br />
                    <p className="card-text" id="collapseContent" >
                        ABC
                    </p>
                    <button className="pd group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "            >

                        <span className="block group-disabled:hidden ">Read More</span>
                    </button>


                </div>


            </section>


        </div>

    );
};
