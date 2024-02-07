import Link from 'next/link';

const Button = ({ onClick = null, href = null, children, disabled = false, className = '' }) =>
    href ? (
        <Link
            className={`btn btn-primary border-2 border-primary-content-accent rounded-full w-full no-animation hover:bg-primary-content-accent hover:text-primary-content-active hover:border-primary-content-accent ${className}`}
            href={href}
        >
            {children}
        </Link>
    ) : onClick ? (
        <button
            className={`btn btn-primary border-2 border-primary-content-accent rounded-full w-full no-animation hover:bg-primary-content-accent hover:text-primary-content-active hover:border-primary-content-accent ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    ) : (
        <div
            className={`btn btn-primary border-2 border-primary-content-accent rounded-full w-full no-animation hover:bg-primary-content-accent hover:text-primary-content-active hover:border-primary-content-accent ${className}`}
        >
            {children}
        </div>
    );

export default Button;
