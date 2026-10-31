import Image from 'next/image';
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
          <div className="model-label">IMAGE → MESH → AR / EXPORT</div>
        </div>
      )}
      {project.slug === 'shopify-fashion-store' && (
        <div className="shopify-ui">
          <Image className="shopify-slide shopify-slide-primary" src={project.screenshot ?? '/images/projects/asimon-charcoal-utility-overshirt.png'} alt="" fill sizes="(max-width: 900px) 80vw, 370px" />
          <Image className="shopify-slide shopify-slide-secondary" src="/images/asim-about-960.webp" alt="" fill sizes="(max-width: 900px) 80vw, 370px" />
          <div className="shopify-storebar"><strong>ASIMON</strong><span>SHOPIFY PRODUCT</span></div>
          <div className="shopify-product-card">
            <small>ASIMON / NEW ARRIVAL</small>
            <strong>Charcoal Utility Overshirt</strong>
            <span className="shopify-price">$89.00</span>
            <div className="shopify-sizes"><em>Size</em>{['S', 'M', 'L', 'XL'].map((size) => <i key={size}>{size}</i>)}</div>
          </div>
          <div className="shopify-cart">BAG / 0</div>
          <div className="shopify-slide-dots"><i /><i /></div>
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
