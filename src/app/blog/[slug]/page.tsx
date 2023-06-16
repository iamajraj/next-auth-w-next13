import React from 'react';
import { prisma } from '../../../lib/db';
import EditorOutput from '../../../components/EditorOutput';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
    },
  });

  return posts.map((post) => {
    slug: post.slug;
  });
}

async function Page({ params }: Props) {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      User: true,
    },
  });

  if (!post) return <div>Post not found</div>;
  return (
    <div className="w-full flex flex-col max-w-7xl mx-auto pt-5">
      <div className="flex items-center gap-5">
        <img
          src={post.User?.image ?? ''}
          alt="prof"
          className="w-6 rounded-full"
        />
        <p>Post by {post.User?.name}</p>
      </div>
      <div className="my-5"></div>
      <Link
        href={'/blog'}
        className="self-start border px-7 py-2 rounded-lg cursor-pointer"
      >
        Back
      </Link>
      <div className="my-5"></div>

      <h1 className="text-4xl mb-4">{post.title}</h1>
      <EditorOutput body={post.body} />
    </div>
  );
}

export default Page;
