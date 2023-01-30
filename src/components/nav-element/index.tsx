/* tslint:disable:no-empty */
import Link from 'next/link';
import Text from '../Text';
import { cn } from '../../utils';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

type NavElementProps = {
    label: string;
    href: string;
    as?: string;
    scroll?: boolean;
    chipLabel?: string;
    disabled?: boolean;
    navigationStarts?: () => void;
};

const NavElement = ({
    label,
    href,
    as,
    scroll,
    disabled,
    navigationStarts = () => {},
}: NavElementProps) => {
    const router = useRouter();
    const isActive = href === router.asPath || (as && as === router.asPath);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.className = cn(
                'h-0.5 w-1/4 transition-all duration-300 ease-out',
                isActive
                    ? '!w-full bg-gradient-to-l from-fuchsia-500 to-pink-500 '
                    : 'group-hover:w-1/2 group-hover:bg-fuchsia-500',
            );
        }
    }, [isActive]);

    return (
        <Link
            href={href}
            as={as}
            scroll={scroll}
            passHref
            className={cn(
                'group flex h-full flex-col items-center justify-between',
                disabled &&
                    'pointer-events-none cursor-not-allowed opacity-50',
            )}
            onClick={() => navigationStarts()}
        >
            <div className="flex flex-row items-center gap-3">
                <Text variant="nav-heading"> {label} </Text>
            </div>
            <div ref={divRef} />
        </Link>
    );
};

export default NavElement;

