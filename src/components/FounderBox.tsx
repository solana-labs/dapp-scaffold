import MembershipFeature from 'components/MembershipFeature';
import Icon from 'components/Icon';
import Button from 'components/Button';

const FounderBox = () => {
    return (
        <>
            <div className="bg-yellow text-primary-content relative rounded-2xl border-2 border-founder">
                <div className="container p-4 md:p-8 max-w-xl mx-auto">
                    <h2 className="mb-4 font-semibold">Become a Talk Founder</h2>
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
                    <div className="grid grid-cols-2 gap-4 text-primary-content">
                        <MembershipFeature
                            icon="chat"
                            title="Instant Access"
                            description="Choose a username and use talk.xyz today."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="chat-image"
                            title="Talk Founders NFT"
                            description="A tradeable SOL NFT for your founders pass."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="founder"
                            title="Treated like Royalty"
                            description="A little bling with your own founders crown."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="award"
                            title="Always First"
                            description="You'll get access to new features as we ship them."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="founder"
                            title="Treated like Royalty"
                            description="A little bling with your own founders crown."
                            iconColor="text-founder"
                        />
                        <MembershipFeature
                            icon="award"
                            title="Always First"
                            description="You'll get access to new features as we ship them."
                            iconColor="text-founder"
                        />
                    </div>
                </div>
            </div>
            <div className="py-4">
                <Button className="">
                    Mint my Founders Pass
                </Button>
            </div>
        </>
    );
};

export default FounderBox;
