import { NextRequest, NextResponse } from 'next/server'
import { createUser, userExists } from '@/lib/user-store'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, plan } = await req.json()

    // Validate input
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

    // Don't allow registering with the super admin email
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@docflow.pro'
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'This email address is not available.' },
        { status: 409 }
      )
    }

    // Check for duplicate
    if (userExists(email)) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    // Create the user
    const user = await createUser({ name: name.trim(), email, password, plan })

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
