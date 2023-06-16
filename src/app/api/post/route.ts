import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getAuthSession } from '../../../lib/authOptions';

export const POST = async (req: Request) => {
  const body = await req.json();
  const session = await getAuthSession();

  const post = await prisma.post.create({
    data: {
      title: body.title,
      body: body.data,
      slug: (body.title as string).split(' ').join('-').toLowerCase(),
      authorId: session?.user.id,
    },
  });
  return NextResponse.json({ post });
};

export const GET = async (req: Request) => {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
    },
  });

  return NextResponse.json(posts);
};
