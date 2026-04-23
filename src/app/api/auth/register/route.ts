import { NextRequest, NextResponse } from 'next/server'
import { createUser, userExists } from '@/lib/user-store'
import { db } from '@/lib/db'
import { logAudit } from '@/lib/audit'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const rl = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60 * 60_000 })
    if (!rl.ok) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, password, plan, company } = await req.json()

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@docflow.pro'
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'This email address is not available.' },
        { status: 409 }
      )
    }

    if (await userExists(email)) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    const user = await createUser({
      name: name.trim(),
      email,
      password,
      plan: plan ?? 'starter',
      company: company?.trim() || undefined,
    })

    // Attach a free subscription to the chosen plan
    const planRow = await db.plan.findUnique({ where: { slug: plan ?? 'starter' } })
    if (planRow) {
      await db.subscription.create({
        data: {
          userId: user.id,
          planId: planRow.id,
          status: 'ACTIVE',
          provider: 'FREE',
        },
      })
    }

    await logAudit({
      userId: user.id,
      action: 'user.register',
      target: user.email,
      req,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
    })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
