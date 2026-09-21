'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/profile';
import { ProjectVisual } from './project-visual';

function DataVeilDemo() {
  return (
    <div
      className="project-demo demo-dataveil tone-indigo"
      role="img"
      aria-label="Animated DataVeil product demonstration: sensitive data is detected and masked locally before an AI request, then safely restored."
      data-active="false"
    >
      <div className="demo-technical-grid" aria-hidden="true" />
      <div className="demo-chrome" aria-hidden="true">
        <span><i /><i /><i /></span>
        <b>DATAVEIL / LOCAL PRIVACY LAYER</b>
        <em>PRIVATE BY DESIGN</em>
      </div>

      <div className="demo-stage" aria-hidden="true">
        <div className="demo-scene dataveil-source">
          <span className="demo-step">01 / INPUT</span>
          <div className="document-window">
            <p><mark className="entity person">Asim<span>PERSON</span></mark> works at <mark className="entity org">OpenAI<span>ORGANIZATION</span></mark> in <mark className="entity location">Kerala<span>LOCATION</span></mark>.</p>
            <p>Email: <mark className="entity email">example@email.com<span>EMAIL</span></mark></p>
            <p>Phone: <mark className="entity phone">+91 98765 43210<span>PHONE</span></mark></p>
            <i className="scan-line" />
          </div>
          <span className="demo-caption">LOCAL DETECTION / SENSITIVE ENTITIES</span>
        </div>

        <div className="demo-scene dataveil-mask">
          <span className="demo-step">02 / ANONYMIZE</span>
          <div className="document-window masked-copy">
            <p><b>&lt;PERSON_1&gt;</b> works at <b>&lt;ORGANIZATION_1&gt;</b> in <b>&lt;LOCATION_1&gt;</b>.</p>
            <p>Email: <b>&lt;EMAIL_1&gt;</b></p>
            <p>Phone: <b>&lt;PHONE_1&gt;</b></p>
          </div>
          <div className="protected-status"><i /> PROTECTED LOCALLY</div>
        </div>

        <div className="demo-scene dataveil-relay">
          <span className="demo-step">03 / SAFE AI INPUT</span>
          <div className="relay-node relay-local"><small>LOCAL</small><b>MASKED DATA</b></div>
          <div className="relay-line"><i /></div>
          <div className="relay-node relay-cloud"><small>EXTERNAL</small><b>AI SERVICE</b></div>
          <p>Private information stays on device.</p>
        </div>

        <div className="demo-scene dataveil-restore">
          <span className="demo-step">04 / RESPONSE</span>
          <div className="restore-arrow"><span>AI OUTPUT</span><i>→</i><span>RESTORE</span></div>
          <div className="restored-line"><b>&lt;PERSON_1&gt;</b><span>Asim</span></div>
          <div className="restored-line"><b>&lt;LOCATION_1&gt;</b><span>Kerala</span></div>
          <div className="protected-status"><i /> CONTROLLED RESTORATION</div>
        </div>

        <div className="demo-scene demo-end dataveil-end">
          <span className="demo-step">DATAVEIL / 01</span>
          <div><strong>Protect before<br />you prompt.</strong><p>Local privacy layer for AI workflows.</p></div>
          <span className="end-status"><i /> LOCAL-FIRST</span>
        </div>
      </div>
    </div>
  );
}

function Chair({ variant }: { variant: 'flat' | 'wire' | 'solid' }) {
  return (
    <div className={`demo-chair chair-${variant}`}>
      <span className="chair-back" />
      <span className="chair-seat" />
      <span className="chair-leg chair-leg-a" />
      <span className="chair-leg chair-leg-b" />
      <span className="chair-depth" />
    </div>
  );
}

function ImageToThreeDemo() {
  return (
    <div
      className="project-demo demo-three tone-amber"
      role="img"
      aria-label="Animated image-to-3D product demonstration: a product image becomes a reconstructed model for interactive preview and export."
      data-active="false"
    >
      <div className="demo-technical-grid" aria-hidden="true" />
      <div className="demo-chrome" aria-hidden="true">
        <span><i /><i /><i /></span>
        <b>IMAGE / 3D PIPELINE</b>
        <em>TRIPOSR</em>
      </div>

      <div className="demo-stage" aria-hidden="true">
        <div className="demo-scene three-upload">
          <span className="demo-step">01 / UPLOAD</span>
          <div className="drop-zone"><Chair variant="flat" /><b>DROP IMAGE</b><small>JPG / PNG / WEBP</small></div>
          <div className="drag-chip">product-chair.jpg</div>
        </div>

        <div className="demo-scene three-process">
          <span className="demo-step">02 / PROCESS</span>
          <div className="process-object"><Chair variant="flat" /><i className="scan-line" /></div>
          <div className="process-steps"><span>IMAGE</span><i /><span>FEATURE EXTRACTION</span><i /><span>3D RECONSTRUCTION</span><i /><span>MESH</span></div>
        </div>

        <div className="demo-scene three-transform">
          <span className="demo-step">03 / TRANSFORM</span>
          <div className="transform-item transform-flat"><Chair variant="flat" /><small>IMAGE</small></div>
          <i className="transform-arrow">→</i>
          <div className="transform-item transform-wire"><Chair variant="wire" /><small>WIREFRAME</small></div>
          <i className="transform-arrow">→</i>
          <div className="transform-item transform-solid"><Chair variant="solid" /><small>SOLID</small></div>
        </div>

        <div className="demo-scene three-model">
          <span className="demo-step">04 / INTERACTIVE MODEL</span>
          <div className="model-viewer"><Chair variant="solid" /><span className="orbit-line" /></div>
          <div className="model-controls"><span>ROTATE</span><span>ZOOM</span><span>OBJ</span><span>GLB</span></div>
        </div>

        <div className="demo-scene three-delivery">
          <span className="demo-step">05 / PRODUCT STUDIO</span>
          <div className="delivery-window">
            <span>PRODUCT / CHAIR</span>
            <div><Chair variant="solid" /><p><b>GLB</b><b>OBJ</b><b>SUPABASE</b></p></div>
          </div>
          <div className="delivery-copy"><strong>PREVIEW.<br />EXPORT. SAVE.</strong><span>FASTAPI / PRODUCT WORKFLOW</span></div>
        </div>

        <div className="demo-scene demo-end three-end">
          <span className="demo-step">IMAGE / 3D / 02</span>
          <div><strong>IMAGE → 3D</strong><p>From a single image to an interactive 3D asset.</p></div>
          <span className="end-status">TRIPOSR / FASTAPI / PYTHON</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectDemo({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const demo = container.querySelector<HTMLElement>('.project-demo');
    if (!demo) return;

    if (!('IntersectionObserver' in window)) {
      demo.dataset.active = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { demo.dataset.active = String(entry.isIntersecting); },
      { rootMargin: '80px 0px', threshold: 0.12 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="project-demo-shell">
      {project.slug === 'dataveil' ? <DataVeilDemo /> : project.slug === 'image-to-3d-ar' ? <ImageToThreeDemo /> : <ProjectVisual project={project} index={index} />}
    </div>
  );
}
