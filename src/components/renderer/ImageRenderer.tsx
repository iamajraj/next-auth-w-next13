'use client';

function ImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <img alt="image" className="object-contain w-full" src={src} />
    </div>
  );
}

export default ImageRenderer;
