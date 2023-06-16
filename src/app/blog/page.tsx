import React from 'react';
import { prisma } from '../../lib/db';
import Link from 'next/link';

type Props = {};

async function Page({}: Props) {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
    },
  });
  return (
    <div className="max-w-7xl w-full mx-auto p-5 ">
      <h1 className="text-5xl pb-10">Blogs</h1>
      <Link
        href={'/'}
        className="self-start border px-7 py-2 rounded-lg cursor-pointer"
      >
        Back
      </Link>
      <div className="my-8"></div>
      <div className="flex items-center gap-5 flex-wrap">
        {posts.map((post) => {
          return (
            <Link
              href={`/blog/${post.slug}`}
              className="px-4 py-4 border shadow-sm rounded-lg cursor-pointer"
            >
              <h1>{post.title}</h1>
              <p className="text-[11px] mt-3">Author {post.User?.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
