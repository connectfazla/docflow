import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const templates = await db.template.findMany({
    where: { isPublic: true },
    orderBy: [{ category: 'asc' }, { title: 'asc' }],
  })
  return NextResponse.json({ templates })
}
