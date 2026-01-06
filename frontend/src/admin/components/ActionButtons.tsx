import React from 'react';
import { Check, X } from 'lucide-react';

interface ActionButtonsProps {
    onAccept: (e: React.MouseEvent) => void;
    onReject: (e: React.MouseEvent) => void;
    disabled?: boolean;
    size?: 'sm' | 'md';
}

const ActionButtons = ({ onAccept, onReject, disabled = false, size = 'md' }: ActionButtonsProps) => {
    const btnSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onAccept}
                disabled={disabled}
                title="Accept"
                className={`
          ${btnSize} rounded-full flex items-center justify-center
          bg-emerald-500/10 text-emerald-500 border border-emerald-500/20
          hover:bg-emerald-500/20 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20
          active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        `}
            >
                <Check className={iconSize} strokeWidth={2.5} />
            </button>

            <button
                onClick={onReject}
                disabled={disabled}
                title="Reject"
                className={`
          ${btnSize} rounded-full flex items-center justify-center
          bg-red-500/10 text-red-500 border border-red-500/20
          hover:bg-red-500/20 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20
          active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        `}
            >
                <X className={iconSize} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ActionButtons;
