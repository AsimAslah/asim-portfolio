type ResponsivePortraitProps = {
  alt: string;
  className?: string;
  height: number;
  sizes: string;
  src: string;
  srcSet: string;
  width: number;
};

function ResponsivePortrait({ alt, className, height, sizes, src, srcSet, width }: ResponsivePortraitProps) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
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
