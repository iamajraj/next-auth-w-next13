// @ts-nocheck

'use client';

import EditorJS from '@editorjs/editorjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = {};

function Page({}: Props) {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const Header = (await import('@editorjs/header')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const Embed = (await import('@editorjs/embed')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        inlineToolbar: true,

        onReady: () => {
          ref.current = editor;
        },
        tools: {
          embed: Embed,
          header: {
            class: Header,
            inlineToolbar: ['link'],
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Quote's author",
            },
          },
        },
        holder: 'editor',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <div>
      <div id="editor" className="mt-10"></div>
    </div>
  );
}

export default Page;
