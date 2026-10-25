import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, HelpCircle, AlertOctagon } from 'lucide-react';
import { VerificationStatus } from '@/lib/types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  showIcon = true,
  className = '',
  onClick,
}) => {
  const configs: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    verified: {
      label: 'Verified',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    },
    needs_review: {
      label: 'Needs Review',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    },
    outdated: {
      label: 'Outdated',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
    },
    disputed: {
      label: 'Disputed',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-purple-600" />,
    },
    unverified: {
      label: 'Unverified',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
      icon: <HelpCircle className="w-3.5 h-3.5 text-slate-500" />,
    },
  };

  const config = configs[status] || configs.unverified;

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      } ${className}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
