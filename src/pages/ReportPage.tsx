import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { reportKey } from '../hooks/usePlantDiagnosis';
import type { HerbariumReport } from '../types/plant.types';
import { getReportDetails, illustrativeDisclaimer } from '../utils/reportDetails';

const back = <Link className="btn report-back" to="/#features">Return to the Observatory</Link>;

function ReportNotes({ title, items = [] }: { title: string; items?: string[] }) {
  return (
    <section className="living-report-block">
      <h2>{title}</h2>
      {items.length ? <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p>No notes available.</p>}
    </section>
  );
}

export default function ReportPage() {
  const report = useQueryClient().getQueryData<HerbariumReport>(reportKey);

  return (
    <section className="report-page section" aria-labelledby="report-title">
      <article className="living-report report-sheet">
        <header className="living-report-top"><span>LEAFORA / BOTANICAL ARCHIVE</span><span>FIELD NOTE 001</span></header>
        <h1 id="report-title">Herbarium <em>Report</em></h1>
        {report ? <ReportContents report={report} /> : <p>No specimen is available in this session. Choose a leaf in the Observatory to prepare a report.</p>}
      </article>
      {back}
    </section>
  );
}

function ReportContents({ report }: { report: HerbariumReport }) {
  const { specimen, diagnosis } = report;
  const details = getReportDetails(report);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  async function exportPdf() {
    setExporting(true);
    setExportError('');
    try {
      const { downloadReportPdf } = await import('../utils/downloadReportPdf');
      await downloadReportPdf(report);
    } catch {
      setExportError('The PDF could not be downloaded. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      {details.illustrative && <p className="report-notice">{illustrativeDisclaimer}.</p>}
      <div className="living-report-main">
        <figure className="living-report-photo">
          <img src={specimen.image} alt="Selected leaf specimen in the botanical report" />
          <span className="living-tape" aria-hidden="true" />
          <figcaption className="living-photo-caption">SPECIMEN 01 · IMAGE STUDY</figcaption>
        </figure>
        <dl className="living-report-details">
          <div><dt>Specimen</dt><dd>{details.specimenName}</dd></div>
          <div><dt>Source</dt><dd>{details.source}</dd></div>
          <div><dt>Observation status</dt><dd className="living-report-status">{details.status}</dd></div>
          {details.plant && <div><dt>Plant</dt><dd>{details.plant}</dd></div>}
          {details.condition && <div><dt>Predicted condition</dt><dd>{details.condition}</dd></div>}
          {details.detectedClass && <div><dt>Detected class</dt><dd>{details.detectedClass}</dd></div>}
          {details.confidence && <div><dt>Confidence</dt><dd>{details.confidence}</dd></div>}
        </dl>
      </div>
      <div className="living-report-blocks">
        <ReportNotes title="Field Observations" items={diagnosis.fieldObservations} />
        <ReportNotes title="Care Notes" items={diagnosis.careRecommendations} />
      </div>
      <div className="living-report-bottom">
        <span>LEAFORA · HERBARIUM</span>
        <div className="report-actions">
          <button type="button" onClick={() => window.print()}>Print Report</button>
          <button className="report-download" type="button" disabled={exporting} onClick={exportPdf}>
            {exporting ? 'Preparing PDF…' : 'Download PDF'}
          </button>
        </div>
      </div>
      {exportError && <p className="report-export-error" role="alert">{exportError}</p>}
    </>
  );
}
