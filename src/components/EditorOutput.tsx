'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ImageRenderer from './renderer/ImageRenderer';
import CodeRenderer from './renderer/CodeRenderer';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

type Props = { body: any };

const renderers = {
  image: ImageRenderer,
  code: CodeRenderer,
};

function EditorOutput({ body }: Props) {
  return <Output data={body} renderer={renderers} />;
}

export default EditorOutput;
