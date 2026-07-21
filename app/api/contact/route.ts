import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_ADDRESS = 'karim.lguerzyfy@gmail.com'
const FROM_ADDRESS = 'onboarding@resend.dev'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GENERIC_ERROR = 'Something went wrong. Please try again later.'

type ContactPayload = {
  from?: unknown
  subject?: unknown
  message?: unknown
  honeypot?: unknown
}

export async function POST(req: Request) {
  let body: ContactPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const { from, subject, message, honeypot } = body

  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  if (
    typeof from !== 'string' || typeof subject !== 'string' || typeof message !== 'string' ||
    from.trim() === '' || subject.trim() === '' || message.trim() === '' ||
    !EMAIL_RE.test(from.trim())
  ) {
    return NextResponse.json({ ok: false, error: 'Invalid input.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 500 })
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: from.trim(),
      subject: `[Portfolio] ${subject.trim()}`,
      text: `From: ${from.trim()}\n\n${message.trim()}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact send failed:', err)
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 500 })
  }
}
