import type { Project } from '@/data/profile';

export function ProjectVisual({ project, index, compact = false }: { project: Project; index?: number; compact?: boolean }) {
  return (
    <div className={`project-visual tone-${project.tone} ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      {typeof index === 'number' && <span className="visual-index">0{index + 1}</span>}
      <div className="visual-grid" />
      {project.slug === 'dataveil' && (
        <div className="dataveil-ui">
          <div className="visual-toolbar"><i /><i /><i /><span>LOCAL PRIVACY LAYER</span></div>
          <div className="mask-row"><span>NAME</span><b>[ PERSON_01 ]</b></div>
          <div className="mask-row"><span>EMAIL</span><b>[ EMAIL_01 ]</b></div>
          <div className="mask-status"><i /> Protected before external processing</div>
        </div>
      )}
      {project.slug === 'image-to-3d-ar' && (
        <div className="model-ui">
          <div className="model-object"><span /><span /><span /></div>
          <div className="model-track"><i /><i /><i /><i /><i /></div>
          <div className="model-label">IMAGE → MESH → AR</div>
        </div>
      )}
      {project.slug === 'velora' && (
        <div className="velora-ui">
          <span className="furniture-back" />
          <span className="furniture-seat" />
          <span className="furniture-leg leg-a" />
          <span className="furniture-leg leg-b" />
          <div>VELORA<small>Considered spaces.</small></div>
        </div>
      )}
      {project.slug === 'ai-virtual-keyboard' && (
        <div className="keyboard-ui">
          <div className="hand-point"><i /><span /><span /><span /></div>
          <div className="keys">
            {'QWERTYUIOPASDFGHJKL'.split('').map((key) => <span key={key}>{key}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
