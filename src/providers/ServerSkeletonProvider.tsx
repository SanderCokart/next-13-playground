import type {ReactNode} from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';
import globalSkeletonProps from '@/constants/global-skeleton-props';

export default function ClientSkeletonProvider({ children }: { children: ReactNode }) {
    return (
        <SkeletonTheme {...globalSkeletonProps}>
            {children}
        </SkeletonTheme>
    );
}