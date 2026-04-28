/**
 * Shared number formatter for all chart components.
 *
 * Three modes:
 *  - `compact`  → "$15M"           — used for axis ticks
 *  - `precise`  → "$15.7M"         — used for tooltips and annotation callouts
 *  - `full`     → "$15,723,911"    — used for screen-reader data tables
 */
export type FormatMode = 'compact' | 'precise' | 'full';

export function formatChartUSD(n: number, mode: FormatMode = 'precise'): string {
  if (!Number.isFinite(n)) return '$0';
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);

  if (mode === 'full') {
    return `${sign}$${Math.round(abs).toLocaleString()}`;
  }

  if (mode === 'compact') {
    if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(0)}B`;
    if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(0)}M`;
    if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
    return `${sign}$${Math.round(abs)}`;
  }

  // precise
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${Math.round(abs)}`;
}

export function formatPctInt(n: number): string {
  return `${Math.round(n)}%`;
}
