import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-emerald-50 to-emerald-100 border-emerald-200',
    purple: 'from-violet-50 to-violet-100 border-violet-200',
    red: 'from-rose-50 to-rose-100 border-rose-200',
    orange: 'from-amber-50 to-amber-100 border-amber-200',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-200'
  };

  const iconColorClasses = {
    blue: 'text-blue-600 bg-blue-600/10',
    green: 'text-emerald-600 bg-emerald-600/10',
    purple: 'text-violet-600 bg-violet-600/10',
    red: 'text-rose-600 bg-rose-600/10',
    orange: 'text-amber-600 bg-amber-600/10',
    indigo: 'text-indigo-600 bg-indigo-600/10'
  };

  return (
    <div className={`card-hover rounded-2xl border bg-gradient-to-br ${colorClasses[color]} p-5 shadow-sm`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColorClasses[color]}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
