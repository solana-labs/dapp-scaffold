import Icon from 'components/Icon';

const MembershipFeature = ({ icon, iconColor, title, description }) => (
    <div className="flex flex-col items-center text-center text-balance mt-4 gap-2">
        <Icon name={icon} className={iconColor} />
        <h3 className="font-semibold">{title}</h3>
        <p>{description}</p>
    </div>
);

export default MembershipFeature;
