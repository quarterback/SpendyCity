/**
 * Semantic color ramp for PDX Spend chart components.
 *
 * Hex values are pulled from the editorial palette in `src/app.css` so the
 * existing visual look is preserved. Where two encodings collide in dollars
 * (restricted vs movable, on-intent vs drift), use the matching pattern fills
 * exposed by `chartPatternDefs()` so the chart still parses for color-blind
 * and grayscale viewers.
 */
export const chartColors = {
  /** Dollars still aimed where voters approved. Editorial ink. */
  restricted: '#161513',
  /** Dollars re-aimed since enactment. Burnt-sienna accent. */
  movable: '#b23c1a',
  /** Committed but not yet spent. Lighter neutral. */
  obligated: '#c5bfae',
  /** Outflow for a given year. */
  spent: '#54514a',
  /** Voter-intent reference / 100% line. */
  intent: '#54514a',
  /** Modeled actual disposition. */
  actual: '#b23c1a',
  /** Audit-event marker. */
  audit: '#b23c1a',
  /** Year-end balance line. */
  balance: '#161513',
  /** Unobligated reserve area. */
  reserve: '#2c4a52',
  /** Axis text color. Tested AA against the paper background. */
  axis: '#54514a',
  /** Subtle gridlines. */
  grid: '#d9d4c7',
  /** Page background, used for label backplates. */
  paper: '#f7f5f0',
  /** Focus ring color. */
  focus: '#b23c1a'
} as const;

export type ChartColor = keyof typeof chartColors;

/**
 * SVG `<defs>` markup for redundant pattern fills. Inject once per chart.
 *
 * Pattern IDs are namespaced per call (`uid` argument) to avoid collisions
 * when multiple chart instances share a page. Use the returned IDs as
 * `fill="url(#...)"` on the elements where pattern + color encode the same
 * field (e.g. movable share next to restricted share).
 */
export function chartPatternDefs(uid: string) {
  const movableId = `pat-movable-${uid}`;
  const driftId = `pat-drift-${uid}`;
  const obligatedId = `pat-obligated-${uid}`;
  return {
    movableId,
    driftId,
    obligatedId,
    /**
     * Returns markup to inject inside a `<defs>` block. Diagonal stripes for
     * `movable` (over the accent fill) and a wider hatch for `drift`.
     */
    markup: `
      <pattern id="${movableId}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="${chartColors.movable}"/>
        <line x1="0" y1="0" x2="0" y2="6" stroke="${chartColors.paper}" stroke-width="1.2" stroke-opacity="0.55"/>
      </pattern>
      <pattern id="${driftId}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="${chartColors.movable}" fill-opacity="0.18"/>
        <line x1="0" y1="0" x2="0" y2="8" stroke="${chartColors.movable}" stroke-width="1.2" stroke-opacity="0.55"/>
      </pattern>
      <pattern id="${obligatedId}" patternUnits="userSpaceOnUse" width="6" height="6">
        <rect width="6" height="6" fill="${chartColors.obligated}" fill-opacity="0.45"/>
      </pattern>
    `
  };
}

/** Breakpoint at which charts collapse into "compact" mode. */
export const CHART_COMPACT_BREAKPOINT = 520;
