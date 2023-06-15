import { prisma } from '../../../lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
      sessions: true,
    },
  });
  return NextResponse.json(users);
};
