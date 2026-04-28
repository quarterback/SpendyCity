/**
 * Collision-aware vertical layout for annotation labels.
 *
 * Inputs are anchor positions in chart-space (`x`, `y`). The function returns
 * a parallel array of resolved label positions where labels of the given
 * height stay above the chart top by `topPad`, do not overlap each other
 * horizontally within `minGap` pixels, and ride at staggered y rows when
 * crowding makes a single row impossible.
 *
 * This is a small, deterministic layout — no animation, no force simulation —
 * so it is safe to run in `$effect` on every redraw.
 */
export interface AnnotationAnchor {
  x: number;
  y: number;
  width: number; // estimated label width in px (use a measured bbox if you have it)
  /** Identifier passed back through so callers can re-key. */
  id: string;
}

export interface AnnotationLayoutResult {
  id: string;
  /** Anchor x (where the leader line meets the data point). */
  ax: number;
  ay: number;
  /** Resolved label centerline x. */
  lx: number;
  /** Resolved label baseline y. */
  ly: number;
  /** 0-based row this label rides on. */
  row: number;
}

/**
 * Lay out labels above the chart frame in stacked rows. Labels that would
 * overlap a previously placed label on the current row push the next label
 * down a row. `rowHeight` is added per row.
 *
 * Inputs are assumed already sorted by `x` ascending — sort beforehand if
 * the callsite cannot guarantee that.
 */
export function layoutTopLabels(
  anchors: AnnotationAnchor[],
  opts: { topY: number; rowHeight: number; minGap: number; maxRows?: number }
): AnnotationLayoutResult[] {
  const { topY, rowHeight, minGap, maxRows = 4 } = opts;
  const lastXByRow: number[] = [];
  const out: AnnotationLayoutResult[] = [];

  for (const a of anchors) {
    const half = a.width / 2;
    let row = 0;
    while (row < maxRows) {
      const last = lastXByRow[row];
      if (last == null || a.x - half >= last + minGap) break;
      row += 1;
    }
    if (row >= maxRows) row = maxRows - 1;
    lastXByRow[row] = a.x + half;
    out.push({
      id: a.id,
      ax: a.x,
      ay: a.y,
      lx: a.x,
      ly: topY - row * rowHeight,
      row
    });
  }

  return out;
}
