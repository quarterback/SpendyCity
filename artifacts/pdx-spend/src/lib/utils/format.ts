export function formatUSD(n: number, opts: { compact?: boolean; sign?: boolean } = {}): string {
  const sign = opts.sign && n > 0 ? '+' : '';
  if (opts.compact !== false) {
    if (Math.abs(n) >= 1e9) return `${sign}$${(n / 1e9).toFixed(2)}B`;
    if (Math.abs(n) >= 1e6) return `${sign}$${(n / 1e6).toFixed(1)}M`;
    if (Math.abs(n) >= 1e3) return `${sign}$${(n / 1e3).toFixed(0)}K`;
  }
  return `${sign}$${Math.round(n).toLocaleString()}`;
}

export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString();
}

export function formatPct(n: number, digits = 0): string {
  return `${(n * 100).toFixed(digits)}%`;
}

export function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => String(c)).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSVGAsPNG(svg: SVGSVGElement, filename: string, scale = 2) {
  const xml = new XMLSerializer().serializeToString(svg);
  const svg64 = btoa(unescape(encodeURIComponent(xml)));
  const img = new Image();
  const w = svg.clientWidth || svg.viewBox.baseVal.width || 800;
  const h = svg.clientHeight || svg.viewBox.baseVal.height || 480;
  const canvas = document.createElement('canvas');
  canvas.width = w * scale;
  canvas.height = h * scale;
  img.onload = () => {
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#f7f5f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };
  img.src = `data:image/svg+xml;base64,${svg64}`;
}
