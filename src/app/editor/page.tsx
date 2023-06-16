// @ts-nocheck

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../lib/mutations/createPost';
import Link from 'next/link';

type Props = {};

function Page({}: Props) {
  const ref = useRef<EditorJS>();
  const [title, setTitle] = useState('');
  const { mutate, data } = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
  });

  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    const { default: EditorJS } = await import('@editorjs/editorjs');
    const Header = (await import('@editorjs/header')).default;
    const Quote = (await import('@editorjs/quote')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const List = (await import('@editorjs/list')).default;
    const Delimeter = (await import('@editorjs/delimiter')).default;
    const Marker = (await import('@editorjs/marker')).default;
    const Paragraph = (await import('@editorjs/paragraph')).default;
    const Table = (await import('@editorjs/table')).default;
    const Button = (await import('editorjs-button')).default;
    const Code = (await import('@bomdi/codebox')).default;
    const Undo = (await import('editorjs-undo')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        inlineToolbar: true,
        placeholder: 'Write here..',
        onReady: () => {
          ref.current = editor;
          new Undo({ editor });
        },
        tools: {
          code: Code,
          button: Button,
          table: Table,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: List,
          marker: Marker,
          embed: Embed,
          delimeter: Delimeter,
          header: {
            class: Header,
            inlineToolbar: true,
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

  const submit = async () => {
    let data = await ref.current?.save();
    if (!title) return;
    let body = {
      data,
      title,
    };
    body = JSON.stringify(body);
    mutate(body, {
      onSuccess: (d) => {
        console.log(d);
        setTitle('');
      },
      onError: (er) => {
        console.log(er);
      },
    });
  };

  return (
    <div className="py-5 flex flex-col w-full max-w-7xl mx-auto">
      <Link
        href={'/'}
        className="self-start border px-7 py-2 rounded-lg cursor-pointer"
      >
        Back
      </Link>
      <input
        type="text"
        placeholder="Your title..."
        className="text-3xl p-10 border-none outline-none "
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="editor" className="mt-2"></div>
      <button
        onClick={submit}
        className="rounded-lg px-5 py-2 self-center w-full text-center active:scale-110 transition-transform border"
      >
        Save
      </button>
    </div>
  );
}

export default Page;
