"use client";

export default function FontLoader() {
  return (
    <>
      <link
        rel="preload"
        href="https://fonts.cdnfonts.com/css/kfgqpc-uthmanic-script-hafs"
        as="style"
      />
      <link
        rel="stylesheet"
        href="https://fonts.cdnfonts.com/css/kfgqpc-uthmanic-script-hafs"
        media="print"
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.media = "all";
        }}
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/kfgqpc-uthmanic-script-hafs"
        />
      </noscript>
    </>
  );
}
