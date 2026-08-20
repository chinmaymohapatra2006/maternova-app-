import React from 'react';

export const MicroChart = ({
  data = [],
  dataKey = 'value',
  labelKey = 'date',
  color = '#0D9488',
  unit = '',
  height = 120,
  minThreshold = null,
  maxThreshold = null
}) => {
  if (!data || data.length === 0) {
    return <div className="text-xs text-slate-400 text-center py-6">No historical trend data yet</div>;
  }

  const values = data.map((d) => (typeof d[dataKey] === 'number' ? d[dataKey] : parseFloat(d[dataKey]) || 0));
  const minVal = Math.min(...values, minThreshold !== null ? minThreshold - 5 : Infinity);
  const maxVal = Math.max(...values, maxThreshold !== null ? maxThreshold + 5 : -Infinity);
  const padding = 20;
  const width = 360;
  const range = maxVal - minVal || 1;

  const points = values.map((val, idx) => {
    const x = padding + (idx / Math.max(1, values.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x, y, val, label: data[idx][labelKey] };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Baseline grid */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Optional threshold line */}
        {maxThreshold && maxVal >= maxThreshold && (
          <line
            x1={padding}
            y1={height - padding - ((maxThreshold - minVal) / range) * (height - padding * 2)}
            x2={width - padding}
            y2={height - padding - ((maxThreshold - minVal) / range) * (height - padding * 2)}
            stroke="#F43F5E"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}

        {/* Area fill */}
        <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />

        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points & Values */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke={color} strokeWidth="2.5" />
            <text
              x={pt.x}
              y={pt.y - 8}
              textAnchor="middle"
              className="text-[10px] font-bold fill-slate-700 select-none"
            >
              {pt.val}
              {unit ? ` ${unit}` : ''}
            </text>
            <text
              x={pt.x}
              y={height - 5}
              textAnchor="middle"
              className="text-[9px] fill-slate-400 select-none"
            >
              {pt.label ? pt.label.slice(5) : ''}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
