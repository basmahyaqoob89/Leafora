import { useEffect, useRef, useState } from 'react';
import { Button, Upload } from 'antd';
import { ImagePlus, Upload as UploadIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../api/axiosInstance';
import { previewDuration } from '../api/mockDiagnosis';
import SectionHeading from '../components/SectionHeading';
import SpecimenChamber from '../components/SpecimenChamber';
import { reportKey, usePlantDiagnosis } from '../hooks/usePlantDiagnosis';
import type { DiagnosisRequest, HerbariumReport } from '../types/plant.types';

const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxBytes = 10 * 1024 * 1024;
const steps = ['Place your leaf', 'Reveal the details', 'Read its story'];
const scanLabels = ['Opening the glass chamber…', 'Magnifying leaf details…', 'Examining the specimen…', 'Preparing your herbarium sheet…'];

function readImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = async () => {
      const image = new Image();
      image.src = String(reader.result);
      try {
        await image.decode();
        resolve(image.src);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsDataURL(file);
  });
}

export default function Observatory() {
  const [selection, setSelection] = useState<DiagnosisRequest>();
  const [error, setError] = useState('');
  const [reading, setReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useRef(false);
  const diagnosis = usePlantDiagnosis();
  const cache = useQueryClient();
  const navigate = useNavigate();
  const scanning = diagnosis.isPending;
  const preview = !apiBaseUrl || selection?.specimen.source === 'sample';

  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);

  useEffect(() => {
    if (!scanning || !preview) return;
    const started = performance.now();
    const timer = window.setInterval(() => {
      setProgress(Math.min(99, (performance.now() - started) / previewDuration * 100));
    }, 100);
    return () => window.clearInterval(timer);
  }, [scanning, preview]);

  async function selectFile(file: File) {
    setError('');
    if (!imageTypes.includes(file.type)) {
      setError('Choose a JPG, JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size > maxBytes) {
      setError('Choose an image that is 10 MB or smaller.');
      return;
    }
    setReading(true);
    try {
      const image = await readImage(file);
      setSelection({ file, specimen: { image, name: file.name, source: 'upload' } });
    } catch {
      setError('This image could not be opened. Choose a different file.');
    } finally {
      setReading(false);
    }
  }

  function loadSample() {
    setError('');
    setSelection({ specimen: { image: '/images/sample-leaf.svg', name: 'Illustrated sample leaf', source: 'sample' } });
  }

  function inspect() {
    if (!selection || scanning || reading) return;
    setError('');
    setProgress(5);
    diagnosis.mutate(selection, {
      onSuccess: result => {
        if (!active.current) return;
        cache.setQueryData<HerbariumReport>(reportKey, {
          diagnosis: result,
          specimen: selection.specimen,
          createdAt: new Date().toISOString(),
        });
        navigate('/report');
      },
      onError: () => setError('The inspection could not finish. Please try again.'),
    });
  }

  const phase = scanning ? 'scanning' : selection ? 'loaded' : 'empty';
  const stage = scanning ? 2 : selection ? 1 : 0;
  const caption = scanning ? '03 — Optical inspection in progress' : selection ? '02 — Specimen placed' : '01 — Awaiting specimen';

  return (
    <section className="living-section" id="features">
      <div className="living-heading reveal">
        <SectionHeading eyebrow="04 — The botanical observatory">A little world,<br /><i>waiting for your leaf.</i></SectionHeading>
        <p>Place your leaf inside our glass observatory. Watch the instruments come alive, then discover its botanical story.</p>
      </div>
      <div className="living-experience" data-phase={phase}>
        <SpecimenChamber caption={caption} image={selection?.specimen.image} />
        <div className="living-panel" aria-busy={scanning || reading}>
          <div className="living-panel-top"><span>The observation desk</span><span>LF · 01</span></div>
          <div className="living-control">
            <span className="living-step">{['STEP 01 / PREPARE YOUR SPECIMEN', 'STEP 02 / READY TO OBSERVE', 'STEP 03 / OBSERVING'][stage]}</span>
            <h3>{scanning ? <>Reading the<br /><i>details…</i></> : selection ? <>Your leaf is<br /><i>in place.</i></> : <>Every leaf<br />has a story.</>}</h3>
            <p>{scanning ? 'The chamber is examining your specimen.' : selection ? 'The chamber is ready for a closer look.' : 'Choose a photo of your leaf. We’ll place it inside the glass chamber, ready for a closer look.'}</p>
            {scanning ? (
              <div className="living-progress" role="status">
                <div className="living-progress-track" role="progressbar" aria-label="Optical inspection" aria-valuenow={preview ? Math.round(progress) : undefined}>
                  <div className={'living-progress-fill' + (preview ? '' : ' indeterminate')} style={{ width: preview ? progress + '%' : '35%' }} />
                </div>
                <span>{preview ? scanLabels[Math.min(3, Math.floor(progress / 25))] : 'Examining the specimen…'}</span>
              </div>
            ) : (
              <>
                <Upload className="leaf-upload" accept=".jpg,.jpeg,.png,.webp" disabled={reading} showUploadList={false}
                  beforeUpload={file => { void selectFile(file); return Upload.LIST_IGNORE; }}>
                  <Button className="living-button" loading={reading} icon={<UploadIcon aria-hidden="true" />}>
                    {selection ? 'Replace your leaf' : 'Upload your leaf'}
                  </Button>
                </Upload>
                <button className="living-button living-outline" type="button" disabled={reading} onClick={loadSample}>
                  <ImagePlus aria-hidden="true" /> Try a sample leaf
                </button>
                <button className="living-button living-analyze" type="button" disabled={!selection || reading} onClick={inspect}>
                  Begin optical inspection <span aria-hidden="true">→</span>
                </button>
                {selection && <button className="remove-specimen" type="button" disabled={reading} onClick={() => { setSelection(undefined); setError(''); }}>Remove specimen</button>}
              </>
            )}
            {error && <p className="specimen-error" role="alert">{error}</p>}
            {preview && <p className="living-disclaimer">Interactive preview. The analysis shown here is illustrative.</p>}
          </div>
        </div>
      </div>
      <ol className="living-steps" aria-label="Observation steps">
        {steps.map((step, index) => (
          <li key={step} aria-current={index === (scanning ? 1 : 0) ? 'step' : undefined}>
            <b aria-hidden="true">0{index + 1}</b>{step}
          </li>
        ))}
      </ol>
    </section>
  );
}
