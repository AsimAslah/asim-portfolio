'use client';

import { ArrowDown, Cloud, FileSearch, Gauge, HardDrive, LockKeyhole, Route, ScanSearch, ShieldCheck, Sparkles, UserRound, XCircle } from 'lucide-react';
import { useState, type ComponentType, type SVGProps } from 'react';

type Step = {
  label: string;
  summary: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const steps: Step[] = [
  { label: 'User Query / Documents', summary: 'A query and any supplied documents enter the proposed privacy-aware RAG workflow.', Icon: UserRound },
  { label: 'Document Processing', summary: 'Content is prepared for retrieval while preserving the context needed for the request.', Icon: FileSearch },
  { label: 'PII Detection', summary: 'The system identifies spans or regions that may contain personally identifiable information.', Icon: ScanSearch },
  { label: 'Privacy Risk Estimation', summary: 'Detected signals are combined into a privacy-risk estimate for the current input.', Icon: Gauge },
  { label: 'Conformal Risk Calibration', summary: 'A proposed calibration layer represents uncertainty and targets explicit risk control under distribution shift.', Icon: ShieldCheck },
  { label: 'Privacy-Aware Routing', summary: 'The calibrated risk signal determines which processing route is appropriate.', Icon: Route },
  { label: 'Selected Processing Route', summary: 'The request follows a cloud, protected, local-only, or abstention path.', Icon: LockKeyhole },
  { label: 'Response Generation', summary: 'A response is generated only through the selected route and its privacy constraints.', Icon: Sparkles },
];

const routes = [
  { name: 'Sanitized Cloud', description: 'Remove or transform sensitive content before using a cloud processing route.', Icon: Cloud },
  { name: 'Stronger Privacy Protection', description: 'Apply a more protective transformation when estimated privacy risk is higher.', Icon: LockKeyhole },
  { name: 'Local-Only Processing', description: 'Keep processing on a local path when cloud exposure is not appropriate.', Icon: HardDrive },
  { name: 'Refuse / Abstain', description: 'Decline processing when the available route cannot satisfy the intended privacy-risk control.', Icon: XCircle },
];

export function PIIShiftResearchExplorer() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="piishift-flow" role="list" aria-label="Proposed PIIShift-RAG workflow">
        {steps.map(({ label, Icon }, index) => (
          <div className="piishift-flow-item" role="listitem" key={label}>
            <button
              className={activeStep === index ? 'is-active' : ''}
              type="button"
              onClick={() => setActiveStep(index)}
              aria-pressed={activeStep === index}
              aria-controls="piishift-step-explanation"
            >
              <span>0{index + 1}</span>
              <Icon aria-hidden="true" />
              <strong>{label}</strong>
            </button>
            {index < steps.length - 1 && <ArrowDown className="piishift-flow-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="piishift-flow-explanation" id="piishift-step-explanation" aria-live="polite">
        <span>Selected stage / 0{activeStep + 1}</span>
        <strong>{steps[activeStep].label}</strong>
        <p>{steps[activeStep].summary}</p>
      </div>

      <div className="piishift-route-heading">
        <p className="micro-label">Routing outcomes</p>
        <h3>Four proposed privacy routes</h3>
        <p>Select a card to read what each route is intended to do.</p>
      </div>
      <div className="piishift-routes">
        {routes.map(({ name, description, Icon }, index) => (
          <details key={name} open={index === 0}>
            <summary><Icon aria-hidden="true" /><span>0{index + 1}</span><strong>{name}</strong></summary>
            <p>{description}</p>
          </details>
        ))}
      </div>
    </>
  );
}
