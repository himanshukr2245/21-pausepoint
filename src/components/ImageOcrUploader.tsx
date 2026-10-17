import { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { playAlert, playSuccess, playTick } from '../lib/audio';

interface ImageOcrUploaderProps {
  onTextExtracted: (text: string) => void;
  lang?: 'en' | 'hi';
}

export const ImageOcrUploader = ({ onTextExtracted, lang = 'en' }: ImageOcrUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    title: lang === 'hi' ? 'स्क्रीनशॉट स्कैन करें (WhatsApp / SMS / चालान)' : 'Scan Screenshot (WhatsApp / SMS / Challan)',
    subtitle: lang === 'hi' 
      ? 'स्क्रीनशॉट को यहाँ खींचें या Ctrl+V से पेस्ट करें। डिवाइस पर ही OCR निष्कर्षण।'
      : 'Drag & drop image or press Ctrl+V to paste screenshot. 100% on-device OCR.',
    dropOrClick: lang === 'hi' ? 'फ़ाइल चुनें या यहाँ खींचें' : 'Choose file or drag here',
    extracting: lang === 'hi' ? 'पाठ निकाला जा रहा है...' : 'Extracting text from image...',
    completed: lang === 'hi' ? 'टेक्स्ट सफलतापूर्वक निकाला गया!' : 'Text extracted successfully!',
    emptyWarn: lang === 'hi' ? 'कोई स्पष्ट पाठ नहीं मिला। कृपया स्पष्ट स्क्रीनशॉट आज़माएं।' : 'No readable text found. Please try a clearer screenshot.',
    useInDecoder: lang === 'hi' ? 'डिकोडर में लोड करें' : 'Load into Threat Decoder',
    reScan: lang === 'hi' ? 'नया स्क्रीनशॉट चुनें' : 'Scan Another Screenshot',
  };

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processImageFile = async (file: File) => {
    setError(null);
    setFileName(file.name || 'Pasted-Screenshot.png');
    playTick();

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      await runOcr(dataUrl);
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const runOcr = async (imageSrc: string) => {
    setIsProcessing(true);
    setProgress(5);
    setStatusText(lang === 'hi' ? 'OCR इंजन प्रारंभ हो रहा है...' : 'Initializing OCR engine...');

    try {
      const worker = await createWorker('eng');
      setProgress(30);
      setStatusText(lang === 'hi' ? 'अक्षरों का विश्लेषण हो रहा है...' : 'Analyzing text & layout...');

      const ret = await worker.recognize(imageSrc);
      setProgress(95);

      const cleanText = ret.data.text.trim();
      await worker.terminate();

      setIsProcessing(false);
      setProgress(100);

      if (cleanText.length > 5) {
        setExtractedText(cleanText);
        playSuccess();
      } else {
        setError(t.emptyWarn);
        playAlert();
      }
    } catch (err: unknown) {
      setIsProcessing(false);
      playAlert();
      const message = err instanceof Error ? err.message : 'Unknown OCR failure';
      setError(`OCR failed: ${message}. You can still paste text manually.`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleApplyText = () => {
    if (extractedText) {
      playTick();
      onTextExtracted(extractedText);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setFileName('');
    setExtractedText('');
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-fg)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ImageIcon size={16} color="var(--color-brand)" />
            {t.title}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
            {t.subtitle}
          </p>
        </div>
        {imagePreview && (
          <button
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-fg-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={12} />
            {t.reScan}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        style={{ display: 'none' }}
      />

      {!imagePreview ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'var(--color-surface-2)',
            transition: 'all 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(2, 132, 199, 0.12)',
              color: 'var(--color-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UploadCloud size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-fg)' }}>
              {t.dropOrClick}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', marginTop: '0.2rem' }}>
              Supports PNG, JPG, WebP screenshots up to 15MB
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Preview & Processing Status */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              background: 'var(--color-surface-2)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <img
              src={imagePreview}
              alt="Screenshot preview"
              style={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {fileName}
              </div>

              {isProcessing && (
                <div style={{ marginTop: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-brand)' }}>
                    <Loader2 size={13} className="spin-animate" />
                    <span>{statusText || t.extracting} ({progress}%)</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: 'var(--color-border)',
                      borderRadius: 2,
                      marginTop: '0.35rem',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'var(--color-brand)',
                        transition: 'width 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {!isProcessing && extractedText && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--color-success-fg)', marginTop: '0.35rem' }}>
                  <CheckCircle2 size={14} />
                  <span>{t.completed}</span>
                </div>
              )}

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--color-danger-fg)', marginTop: '0.35rem' }}>
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Text Box */}
          {extractedText && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {lang === 'hi' ? 'निकाला गया टेक्स्ट' : 'Extracted Text Preview'}
              </div>
              <div
                style={{
                  maxHeight: 120,
                  overflowY: 'auto',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--color-fg)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {extractedText}
              </div>

              <button
                onClick={handleApplyText}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-brand)',
                  color: 'var(--color-brand-fg)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px var(--color-cyan-glow)',
                }}
              >
                <CheckCircle2 size={15} />
                {t.useInDecoder}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
