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
    <figure className="hero-portrait">
      <ResponsivePortrait
        className="hero-portrait-picture"
        src="/images/asim-hero-1080.webp"
        srcSet="/images/asim-hero-720.webp 720w, /images/asim-hero-1080.webp 1080w, /images/asim-hero-1440.webp 1440w"
        sizes="(max-width: 1040px) calc(100vw - 48px), 42vw"
        width={1440}
        height={1920}
        alt="Asim Aslah P M"
        eager
      />
      <span className="portrait-corner portrait-corner-a" aria-hidden="true" />
      <span className="portrait-corner portrait-corner-b" aria-hidden="true" />
      <div className="portrait-signal" aria-hidden="true"><i /> Open to thoughtful work</div>
      <figcaption><span>AI / FULL STACK</span><span>PALAKKAD, IN</span></figcaption>
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
