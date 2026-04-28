import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { logger } from "./logger";
import type { WorkProductType } from "@workspace/db";

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const LINE_HEIGHT = 14;
const BODY_SIZE = 11;
const HEADING_SIZE = 14;

const PDF_DIR = process.env.PDX_SPEND_PDF_DIR
  ?? path.resolve(process.cwd(), "../pdx-spend/static/agent-pdfs");

interface RenderInput {
  fundSlug: string;
  workProductType: WorkProductType;
  markdown: string;
  outputId: string;
}

function wrapLine(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = current ? `${current} ${w}` : w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function renderMemoToPdf(input: RenderInput): Promise<string> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const mono = await doc.embedFont(StandardFonts.Courier);

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;
  const usableWidth = PAGE_W - MARGIN * 2;

  const writeLine = (text: string, opts: { font?: typeof font; size?: number } = {}) => {
    const f = opts.font ?? font;
    const size = opts.size ?? BODY_SIZE;
    if (y < MARGIN + LINE_HEIGHT) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
    page.drawText(text, { x: MARGIN, y, size, font: f, color: rgb(0, 0, 0), maxWidth: usableWidth });
    y -= LINE_HEIGHT;
  };

  writeLine("PDX Spend", { font: bold, size: HEADING_SIZE });
  writeLine(`Fund: ${input.fundSlug} | Type: ${input.workProductType}`, { font: mono, size: 9 });
  writeLine(`Generated: ${new Date().toISOString()}`, { font: mono, size: 9 });
  y -= 6;

  const charsPerLine = 90;
  for (const rawLine of input.markdown.split("\n")) {
    const line = rawLine.replace(/\t/g, "    ");
    if (line.startsWith("## ")) {
      y -= 4;
      writeLine(line.slice(3), { font: bold, size: HEADING_SIZE });
      continue;
    }
    if (line.startsWith("# ")) {
      y -= 4;
      writeLine(line.slice(2), { font: bold, size: HEADING_SIZE + 2 });
      continue;
    }
    if (line.trim() === "") {
      y -= LINE_HEIGHT / 2;
      continue;
    }
    for (const wrapped of wrapLine(line, charsPerLine)) {
      writeLine(wrapped);
    }
  }

  const bytes = await doc.save();

  await mkdir(PDF_DIR, { recursive: true });
  const fileName = `${input.fundSlug}-${input.workProductType}-${input.outputId}.pdf`;
  const filePath = path.join(PDF_DIR, fileName);
  await writeFile(filePath, bytes);

  const objectPath = `/agent-pdfs/${fileName}`;
  logger.info({ objectPath, bytes: bytes.length }, "pdf.rendered");
  return objectPath;
}
