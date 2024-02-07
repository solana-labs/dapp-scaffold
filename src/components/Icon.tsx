import dynamic from 'next/dynamic';

const Crown = dynamic(() => import('../../public/crown.svg'), { ssr: false });
const UilArrowLeft = dynamic(() => import('@iconscout/react-unicons/icons/uil-arrow-left'), {
    ssr: false
});
const UilEllipsisV = dynamic(() => import('@iconscout/react-unicons/icons/uil-ellipsis-v'), {
    ssr: false
});
const UilExclamationCircle = dynamic(
    () => import('@iconscout/react-unicons/icons/uil-exclamation-circle'),
    { ssr: false }
);
const UilInfoCircle = dynamic(() => import('@iconscout/react-unicons/icons/uil-info-circle'), {
    ssr: false
});
const UilFileAlt = dynamic(() => import('@iconscout/react-unicons/icons/uil-file-alt'), {
    ssr: false
});
const UilAsterisk = dynamic(() => import('@iconscout/react-unicons/icons/uil-asterisk'), {
    ssr: false
});
const UilStar = dynamic(() => import('@iconscout/react-unicons/icons/uil-star'), { ssr: false });
const UilBars = dynamic(() => import('@iconscout/react-unicons/icons/uil-bars'), {
    ssr: false
});
const UilBan = dynamic(() => import('@iconscout/react-unicons/icons/uil-ban'), {
    ssr: false
});
const UilReply = dynamic(() => import('@iconscout/react-unicons/icons/uil-corner-up-left-alt'), {
    ssr: false
});
const UilSmile = dynamic(() => import('@iconscout/react-unicons/icons/uil-smile'), {
    ssr: false
});
const UilImageUpload = dynamic(() => import('@iconscout/react-unicons/icons/uil-image-upload'), {
    ssr: false
});
const UilMessage = dynamic(() => import('@iconscout/react-unicons/icons/uil-message'), {
    ssr: false
});
const UilMultiply = dynamic(() => import('@iconscout/react-unicons/icons/uil-multiply'), {
    ssr: false
});
const UilBookAlt = dynamic(() => import('@iconscout/react-unicons/icons/uil-book-alt'), {
    ssr: false
});
const UilBookmark = dynamic(() => import('@iconscout/react-unicons/icons/uil-bookmark'), {
    ssr: false
});
const UilComment = dynamic(() => import('@iconscout/react-unicons/icons/uil-comment'), {
    ssr: false
});
const UilCommentImage = dynamic(() => import('@iconscout/react-unicons/icons/uil-comment-image'), {
    ssr: false
});
const UilCommentDots = dynamic(() => import('@iconscout/react-unicons/icons/uil-comment-dots'), {
    ssr: false
});
const UilCommentSlash = dynamic(() => import('@iconscout/react-unicons/icons/uil-comment-slash'), {
    ssr: false
});
const UilCheck = dynamic(() => import('@iconscout/react-unicons/icons/uil-check'), {
    ssr: false
});
const UilCoins = dynamic(() => import('@iconscout/react-unicons/icons/uil-coins'), {
    ssr: false
});
const UilTicket = dynamic(() => import('@iconscout/react-unicons/icons/uil-ticket'), {
    ssr: false
});
const UilCopy = dynamic(() => import('@iconscout/react-unicons/icons/uil-copy'), {
    ssr: false
});
const UilSearch = dynamic(() => import('@iconscout/react-unicons/icons/uil-search'), {
    ssr: false
});
const UilSetting = dynamic(() => import('@iconscout/react-unicons/icons/uil-setting'), {
    ssr: false
});
const UilPlus = dynamic(() => import('@iconscout/react-unicons/icons/uil-plus'), {
    ssr: false
});
const UilSignOutAlt = dynamic(() => import('@iconscout/react-unicons/icons/uil-sign-out-alt'), {
    ssr: false
});
const UilEditAlt = dynamic(() => import('@iconscout/react-unicons/icons/uil-edit-alt'), {
    ssr: false
});
const UilComments = dynamic(() => import('@iconscout/react-unicons/icons/uil-comments'), {
    ssr: false
});
const UilUserCircle = dynamic(() => import('@iconscout/react-unicons/icons/uil-user-circle'), {
    ssr: false
});
const UilMobile = dynamic(() => import('@iconscout/react-unicons/icons/uil-mobile-android'), {
    ssr: false
});
const UilAwardAlt = dynamic(() => import('@iconscout/react-unicons/icons/uil-award-alt'), {
    ssr: false
});
const UilHome = dynamic(() => import('@iconscout/react-unicons/icons/uil-home'), {
    ssr: false
});
const UilLock = dynamic(() => import('@iconscout/react-unicons/icons/uil-lock-alt'), {
    ssr: false
});
const UilWallet = dynamic(() => import('@iconscout/react-unicons/icons/uil-wallet'), {
    ssr: false
});
const UilBell = dynamic(() => import('@iconscout/react-unicons/icons/uil-bell'), { ssr: false });
const UilDirections = dynamic(() => import('@iconscout/react-unicons/icons/uil-directions'), {
    ssr: false
});

const Icon = ({ name, width = 22, height = 22, className = '', ...props }) => {
    const getSVG = (name, props) => {
        switch (name) {
            case 'back':
                return <UilArrowLeft {...props} />;
            case 'more':
                return <UilEllipsisV {...props} />;
            case 'error':
            case 'warning':
                return <UilExclamationCircle {...props} />;
            case 'star':
                return <UilStar {...props} />;
            case 'menu':
                return <UilBars {...props} />;
            case 'reply':
                return <UilReply {...props} />;
            case 'smile':
                return <UilSmile {...props} />;
            case 'upload-image':
                return <UilImageUpload {...props} />;
            case 'send':
                return <UilMessage {...props} />;
            case 'close':
                return <UilMultiply {...props} />;
            case 'book':
                return <UilBookAlt {...props} />;
            case 'chat':
                return <UilComment {...props} />;
            case 'chat-image':
                return <UilCommentImage {...props} />;
            case 'chat-wait':
                return <UilCommentDots {...props} />;
            case 'chat-delete':
                return <UilCommentSlash {...props} />;
            case 'success':
            case 'check':
                return <UilCheck {...props} />;
            case 'points':
                return <UilCoins {...props} />;
            case 'invite':
                return <UilTicket {...props} />;
            case 'copy':
                return <UilCopy {...props} />;
            case 'search':
                return <UilSearch {...props} />;
            case 'settings':
            case 'setting':
                return <UilSetting {...props} />;
            case 'plus':
                return <UilPlus {...props} />;
            case 'exit':
                return <UilSignOutAlt {...props} />;
            case 'edit':
                return <UilEditAlt {...props} />;
            case 'new-chat':
                return <UilComments {...props} />;
            case 'founder':
                return <Crown {...props} />;
            case 'mobile':
                return <UilMobile {...props} />;
            case 'user':
                return <UilUserCircle {...props} />;
            case 'award':
                return <UilAwardAlt {...props} />;
            case 'home':
                return <UilHome {...props} />;
            case 'info':
                return <UilInfoCircle {...props} />;
            case 'file':
                return <UilFileAlt {...props} />;
            case 'asterisk':
                return <UilAsterisk {...props} />;
            case 'lock':
                return <UilLock {...props} />;
            case 'pin':
            case 'unpin':
                return <UilBookmark {...props} />;
            case 'ban':
                return <UilBan {...props} />;
            case 'wallet':
                return <UilWallet {...props} />;
            case 'notifications':
                return <UilBell {...props} />;
            case 'sign-in':
                return <UilDirections {...props} />;
            default:
                return null;
        }
    };

    return getSVG(name, {
        className: `svgicon svgicon-${name}${className ? ` ${className}` : ''}`,
        height,
        width,
        ...props
    });
};

export default Icon;
