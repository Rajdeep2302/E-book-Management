import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export type Status = 'accepted' | 'rejected' | 'pending' | 'unverified';

interface StatusBadgeProps {
    status: Status;
    size?: 'sm' | 'md';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
    const styles = {
        accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        unverified: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };

    const icons = {
        accepted: CheckCircle2,
        rejected: XCircle,
        pending: Clock,
        unverified: AlertCircle
    };

    const labels = {
        accepted: 'Accepted',
        rejected: 'Rejected',
        pending: 'Pending',
        unverified: 'Not Verified'
    };

    const Icon = icons[status];
    const style = styles[status];

    return (
        <div className={`
      inline-flex items-center gap-1.5 
      rounded-full border backdrop-blur-md
      font-medium tracking-wide
      ${style}
      ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'}
    `}>
            <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            <span>{labels[status]}</span>
        </div>
    );
};

export default StatusBadge;
