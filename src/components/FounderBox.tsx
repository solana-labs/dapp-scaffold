import React, { useEffect } from 'react';

import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import MembershipFeature from 'components/MembershipFeature';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { useWallet } from "@solana/wallet-adapter-react";

const FounderBox = ({ setShowMint }) => {
    const wallet = useWallet();
    const { setVisible } = useWalletModal();

    const handleClick = () => {
        if (wallet.connected) {
            setShowMint(true);
        } else {
            setVisible(true);
        }
    }

    useEffect(() => {
        if (wallet.connected) {
            setShowMint(true);
        }
    }, [wallet?.connected])
    return (
        <>
            <div className="bg-yellow text-primary-content relative rounded-2xl border-2 border-founder">
                <div className="container p-4 pt-6 md:p-8 md:pb-12 max-w-xl mx-auto">
                    <div className="flex justify-between">
                        <h2 className="mb-4 font-semibold tracking-tight">Become a Talk Founder</h2>
                        <p className="font-semibold tracking-tight">5 SOL</p>
                    </div>
                    <p>
                        Unlock lifetime access to pro features and support our mission to be the
                        conversational home of the crypto community.
                    </p>
                    <div className="rounded-full absolute top-0 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 p-1 flex items-center justify-center bg-founder border-base-100 text-white">
                        <Icon name="founder" />
                    </div>
                    <div className="rounded-xl overflow-hidden mt-4">
                        <video playsInline autoPlay muted loop>
                            <source src="/talk-founders-pass.webm" type="video/webm" />
                        </video>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-4 text-primary-content">
                    <MembershipFeature
                            icon="chat"
                            title="Instant Access"
                            description="Choose your username and use talk.xyz today."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="chat-image"
                            title="Talk Founders NFT"
                            description="A tradeable SOL NFT for your Founders Pass."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="founder"
                            title="Treated like Royalty"
                            description="You'll get access to new features as we ship them."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="lock"
                            title="Private Channels"
                            description="Create your own private channels for friends."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="invite"
                            title="All the Invites"
                            description="Invite friends and degens to Talk with you."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="points"
                            title="Level Up"
                            description="Bonus points when the points system launches."
                            iconColor="text-founder"
                        />
                    </div>
                </div>
            </div>
            <div className="py-4">
                <Button onClick={handleClick} className="md:w-4/5 md:mx-auto md:flex md:-mt-10 md:z-10 md:relative">
                    Mint my Founders Pass
                </Button>
            </div>
        </>
    );
};

export default FounderBox;
