import { jsPDF } from 'jspdf';
import type { HerbariumReport } from '../types/plant.types';
import { getReportDetails, illustrativeDisclaimer } from './reportDetails';

const forest = '#1d4a33';
const ink = '#17231b';
const muted = '#4d6052';
const line = '#dfe4d9';
const margin = 48;

async function prepareImage(src: string) {
  if (!src) return;
  const image = new Image();
  image.src = src;
  try {
    await image.decode();
    const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#fffefa';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return { data: canvas.toDataURL('image/jpeg', .9), width: canvas.width, height: canvas.height };
  } catch {
    return;
  }
}

export async function downloadReportPdf(report: HerbariumReport) {
  const details = getReportDetails(report);
  const image = await prepareImage(report.specimen.image);
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  pdf.setProperties({ title: 'Leafora Herbarium Report', author: 'Leafora' });
  const { pageSize } = pdf.internal;
  const width = pageSize.getWidth();
  const height = pageSize.getHeight();
  const contentWidth = width - margin * 2;
  let y = margin;

  function startPage() {
    pdf.setFillColor('#fffefa').rect(0, 0, width, height, 'F');
    pdf.setFillColor(forest).rect(0, 0, width, 6, 'F');
    pdf.setFont('courier', 'bold').setFontSize(9).setTextColor(forest);
    pdf.text('LEAFORA / BOTANICAL ARCHIVE', margin, margin);
    pdf.text('FIELD NOTE 001', width - margin, margin, { align: 'right' });
    y = margin + 25;
  }

  function ensureSpace(points: number) {
    if (y + points <= height - margin - 20) return;
    pdf.addPage();
    startPage();
  }

  function write(text: string, size = 11, color = ink) {
    const step = size * 1.45;
    const lines: string[] = pdf.setFont('helvetica', 'normal').setFontSize(size).splitTextToSize(text, contentWidth);
    for (const textLine of lines) {
      ensureSpace(step);
      pdf.setFont('helvetica', 'normal').setFontSize(size).setTextColor(color);
      pdf.text(textLine, margin, y);
      y += step;
    }
  }

  function heading(title: string) {
    ensureSpace(55);
    pdf.setDrawColor(line).line(margin, y, width - margin, y);
    y += 22;
    pdf.setFont('times', 'bold').setFontSize(17).setTextColor(forest);
    pdf.text(title, margin, y);
    y += 21;
  }

  function notes(title: string, items: string[] | undefined) {
    heading(title);
    for (const item of items?.length ? items : ['No notes available.']) write(item);
    y += 10;
  }

  startPage();
  pdf.setFont('times', 'italic').setFontSize(34).setTextColor(forest);
  pdf.text('Herbarium Report', margin, y + 20);
  y += 42;
  const date = new Date(report.createdAt ?? Date.now());
  const formattedDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'Asia/Riyadh' })
    .format(Number.isNaN(date.getTime()) ? new Date() : date);
  write(formattedDate, 10, muted);
  if (details.illustrative) write(illustrativeDisclaimer, 11, forest);
  y += 12;

  heading('Specimen');
  if (image) {
    const scale = Math.min(contentWidth / image.width, 200 / image.height);
    const imageWidth = image.width * scale;
    const imageHeight = image.height * scale;
    ensureSpace(imageHeight + 24);
    const x = margin + (contentWidth - imageWidth) / 2;
    pdf.setFillColor('#edf3e7').rect(margin, y - 4, contentWidth, imageHeight + 8, 'F');
    pdf.addImage(image.data, 'JPEG', x, y, imageWidth, imageHeight);
    y += imageHeight + 23;
  } else {
    write('Specimen image unavailable.', 11, muted);
  }

  write(`Specimen: ${details.specimenName}`);
  write(`Source: ${details.source}`);
  y += 10;

  heading('Analysis Result');
  write(`Observation status: ${details.status}`);
  if (details.plant) write(`Plant: ${details.plant}`);
  if (details.condition) write(`Predicted condition: ${details.condition}`);
  write(`Detected class: ${details.detectedClass ?? 'Unavailable'}`);
  write(`Confidence: ${details.confidence ?? 'Unavailable'}`);
  y += 10;

  notes('Field Observations', report.diagnosis.fieldObservations);
  notes('Care Notes', report.diagnosis.careRecommendations);

  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page);
    pdf.setDrawColor(line).line(margin, height - margin, width - margin, height - margin);
    pdf.setFont('courier', 'normal').setFontSize(9).setTextColor(muted);
    pdf.text('LEAFORA / HERBARIUM', margin, height - margin + 16);
    pdf.text(`${page} / ${pages}`, width - margin, height - margin + 16, { align: 'right' });
  }

  pdf.save('leafora-herbarium-report.pdf');
}
