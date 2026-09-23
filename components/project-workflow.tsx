type ProjectWorkflowProps = {
  label: string;
  steps: string[];
};

export function ProjectWorkflow({ label, steps }: ProjectWorkflowProps) {
  return (
    <ol className="workflow" aria-label={label}>
      {steps.map((step, index) => (
        <li key={step} tabIndex={0} aria-label={`Step ${index + 1} of ${steps.length}: ${step}`}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p>{step}</p>
          {index < steps.length - 1 ? <i aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}
