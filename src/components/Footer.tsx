import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export const Footer: FC = () => {
    return (
        <div className="flex">
            <footer className="border-t-2 border-[#141414] bg-black hover:text-white w-screen" >
                <div className="ml-12 py-12 mr-12">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-8 md:space-x-12 relative">
                        <div className='flex flex-col col-span-2 mx-4 items-center md:items-start'>
                            <div className='flex flex-row ml-1'>
                                <Link href="https://solana.com" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    <div className='flex flex-row ml-1'>
                                        <Image
                                            src="/solanaLogo.png"
                                            alt="solana icon"
                                            width={156}
                                            height={96}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="flex md:ml-2">
                                <a href="https://twitter.com/solana_devs" type="button" className="border-white text-secondary hover:text-white leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                                    <svg aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="twitter"
                                        className="w-4 h-full mx-auto"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                    ></path>
                                    </svg>
                                </a>
                                <a href="https://github.com/solana-labs"  type="button" className="border-white text-secondary hover:text-white leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                                    <svg aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="github"
                                        className="w-4 h-full mx-auto"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 496 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                            <div className="mb-6 m-1 sm:text-left place-items-start items-start font-normal tracking-tight text-secondary">
                                        © 2023 Solana Foundation
                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">
                            <div className="font-normal capitalize mb-2.5">SOLANA</div>

                            <div className="flex flex-col mb-0 gap-2">
                                <Link href="https://solana.com" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Labs
                                </Link>
                                <Link href="https://solana.org" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Foundation
                                </Link>
                                <Link href="https://solanamobile.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Solana Mobile
                                </Link>
                                <Link href="https://solanapay.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Solana Pay
                                </Link>
                                <Link href="https://solana.org/grants" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Grants
                                </Link>
                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">
                            <h5 className="font-normal capitalize tracking-tight  mb-2.5">DEVELOPERS</h5>

                            <div className="flex flex-col mb-0 gap-2">
                                <Link href="https://docs.solana.com/developers" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Documentation
                                </Link>
                                <Link href="https://github.com/solana-mobile/solana-mobile-stack-sdk" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Mobile SDK
                                </Link>
                                <Link href="https://github.com/solana-labs/solana-pay" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Pay SDK
                                </Link>
                                <Link href="https://solanacookbook.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Cookbook
                                </Link>
                                <Link href="https://solana.com/developers/dao" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    DAOs
                                </Link>
                            </div>
                        </div>

                        <div className="mb-6 items-center mx-auto max-w-screen-lg">
                            <h5 className="font-normal tracking-tight  mb-2.5">ECOSYSTEM</h5>

                            <div className="flex flex-col mb-0 gap-2">
                                <Link href="https://solana.com/news" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    News
                                </Link>
                                <Link href="https://solana.org/validators" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Validators
                                </Link>
                                <Link href="https://www.youtube.com/@SolanaFndn" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Youtube
                                </Link>
                                <Link href="https://app.realms.today/discover" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Realms
                                </Link>
                                <Link href="https://www.solanau.org" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                                    Solana U
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
