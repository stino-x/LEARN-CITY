import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers";
import { NextResponse } from "next/server"
import type { Stripe } from "stripe";

export async function POST(
    req: Request
) {
    const body  = await  req.text()
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event
    const webhook = process.env.STRIPE_WEBHOOK_SECRET!
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhook)
        console.log('Received event:', event); // Log the event data
    } catch (error: any) {
        console.error('Webhook Error:', error.message); // Log errors
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId

    if (event.type === 'checkout.session.completed') {
        if (!userId || !courseId) {
            return new NextResponse(`Webhook Error: Missing metadata`, {status: 400})
        }

        await db.purchase.create({
            data: {
                userId,
                courseId
            }
        })
    } else {
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, {status: 400})
    }

    return new NextResponse('Webhook Received', {status: 200})
}