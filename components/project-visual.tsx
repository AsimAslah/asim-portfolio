import type { Project } from '@/data/profile';
import { ShopifyCarousel } from './shopify-carousel';

export function ProjectVisual({ project, index, compact = false }: { project: Project; index?: number; compact?: boolean }) {
  return (
    <div className={`project-visual tone-${project.tone} visual-${project.visualKind} ${compact ? 'is-compact' : ''}`} aria-hidden={project.visualKind === 'shopify' ? undefined : true}>
      {typeof index === 'number' && <span className="visual-index">0{index + 1}</span>}
      <div className="visual-grid" />
      {project.visualKind === 'evallens' && (
        <div className="evallens-ui">
          <div className="visual-toolbar"><i /><i /><i /><span>PAIRWISE EVALUATION</span></div>
          <div className="evaluation-pair"><section><small>RESPONSE A</small><b>A</b><span>Scored independently</span></section><section><small>RESPONSE B</small><b>B</b><span>Preference recorded</span></section></div>
          <div className="rubric-bars"><span><i />Accuracy</span><span><i />Instruction following</span><span><i />Clarity</span></div>
          <div className="evaluation-separation"><span>Rubric score</span><i /> <span>Human preference</span></div>
        </div>
      )}
      {project.visualKind === 'quality-lab' && (
        <div className="quality-lab-ui">
          <div className="visual-toolbar"><i /><i /><i /><span>PERSISTED EXECUTION MODEL</span></div>
          <div className="execution-flow">
            {['Validate', 'Persist', 'Analyze', 'PII', 'Rubric', 'Provider', 'Aggregate', 'Report'].map((stage, stageIndex) => (
              <span className={stageIndex < 7 ? 'is-complete' : 'is-running'} key={stage}><i />{stage}<small>{stageIndex < 7 ? 'recorded' : 'report'}</small></span>
            ))}
          </div>
          <div className="execution-event"><i /> Persisted events · resumable SSE · server-measured durations</div>
        </div>
      )}
      {project.visualKind === 'dataveil' && (
        <div className="dataveil-ui">
          <div className="visual-toolbar"><i /><i /><i /><span>LOCAL PRIVACY LAYER</span></div>
          <div className="mask-row"><span>NAME</span><b>[ PERSON_01 ]</b></div>
          <div className="mask-row"><span>EMAIL</span><b>[ EMAIL_01 ]</b></div>
          <div className="mask-status"><i /> Protected before external processing</div>
        </div>
      )}
      {project.visualKind === 'image-to-3d' && (
        <div className="model-ui">
          <div className="model-object"><span /><span /><span /></div>
          <div className="model-track"><i /><i /><i /><i /><i /></div>
          <div className="model-label">IMAGE → MESH → AR / EXPORT</div>
        </div>
      )}
      {project.visualKind === 'shopify' && (
        <ShopifyCarousel compact={compact} />
      )}
      {project.visualKind === 'keyboard' && (
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
