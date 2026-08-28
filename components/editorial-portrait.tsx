type ResponsivePortraitProps = {
  alt: string;
  className?: string;
  eager?: boolean;
  height: number;
  sizes: string;
  src: string;
  srcSet: string;
  width: number;
};

function ResponsivePortrait({ alt, className, eager, height, sizes, src, srcSet, width }: ResponsivePortraitProps) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

export function HeroPortrait() {
  return (
    <figure className="system-map hero-portrait">
      <div className="system-map-header">
        <span>PORTRAIT SYSTEM / 01</span>
        <span className="map-live"><i /> AVAILABLE</span>
      </div>
      <ResponsivePortrait
        className="hero-portrait-picture"
        src="/images/asim-hero-1080.webp"
        srcSet="/images/asim-hero-720.webp 720w, /images/asim-hero-1080.webp 1080w, /images/asim-hero-1440.webp 1440w"
        sizes="(max-width: 1040px) calc(100vw - 48px), 42vw"
        width={1440}
        height={1078}
        alt="Asim Aslah P M"
        eager
      />
      <div className="portrait-edge" aria-hidden="true" />
      <div className="portrait-grid" aria-hidden="true" />
      <div className="portrait-coordinate portrait-coordinate-a" aria-hidden="true">01 / AI ENGINEER</div>
      <div className="portrait-coordinate portrait-coordinate-b" aria-hidden="true">PYTHON / FASTAPI</div>
      <div className="portrait-coordinate portrait-coordinate-c" aria-hidden="true">AI / FULL STACK</div>
      <div className="portrait-bracket portrait-bracket-a" aria-hidden="true" />
      <div className="portrait-bracket portrait-bracket-b" aria-hidden="true" />
      <div className="system-map-footer">
        <span>COMPUTER VISION / PRODUCT BUILDER</span>
        <span>PALAKKAD, KERALA</span>
      </div>
    </figure>
  );
}

export function AboutPortraits() {
  return (
    <div className="about-portraits">
      <figure className="about-primary-portrait">
        <ResponsivePortrait
          src="/images/asim-about-960.webp"
          srcSet="/images/asim-about-640.webp 640w, /images/asim-about-960.webp 960w, /images/asim-about-1280.webp 1280w"
          sizes="(max-width: 820px) calc(100vw - 36px), 46vw"
          width={1280}
          height={1707}
          alt="Asim Aslah P M seated in an editorial interior"
        />
        <figcaption><span>BEYOND THE CODE / 2026</span><span>PALAKKAD / IN</span></figcaption>
      </figure>
      <div className="about-photo-index" aria-hidden="true">PORTRAIT / 02</div>
    </div>
  );
}

export function LifestylePortrait() {
  return (
    <figure className="focus-portrait">
      <ResponsivePortrait
        src="/images/asim-lifestyle-720.webp"
        srcSet="/images/asim-lifestyle-480.webp 480w, /images/asim-lifestyle-720.webp 720w, /images/asim-lifestyle-960.webp 960w"
        sizes="(max-width: 820px) calc(100vw - 36px), 34vw"
        width={960}
        height={1280}
        alt="Asim Aslah P M in a relaxed editorial interior"
      />
      <figcaption><span>PERSONAL NOTE / 03</span><span>CURIOUS OFFLINE, PRECISE ONLINE</span></figcaption>
    </figure>
  );
}
