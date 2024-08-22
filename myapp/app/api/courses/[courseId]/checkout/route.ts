import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { Stripe } from "stripe";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const user = await currentUser();
        if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const course = await db.course.findUnique({
            where: { id: params.courseId },
            select: {
                id: true,  // Ensure the `id` field is selected
                title: true,
                description: true,
                imageUrl: true,
                price: true,
                isPublished: true,
            }
        });

        if (!course?.isPublished) {
            return new NextResponse('Not Found', { status: 404 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? 'DEFAULT_URL';
const successUrl = `${baseUrl}/courses/${course.id}/success=1`;
const cancelUrl = `${baseUrl}/courses/${course.id}/canceled=1`;


        // const successUrl = encodeURI(`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}/success=1`);
        // const cancelUrl = encodeURI(`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}/canceled=1`);
        

       // const successUrl = `https://learn-city.vercel.app/courses/${course.id}/success=1`;
       // const cancelUrl = `https://learn-city.vercel.app/courses/${course.id}/canceled=1`;


        // Debugging lines to check the URLs
        console.log("Success URL:", successUrl);
        console.log("Cancel URL:", cancelUrl);

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    courseId: params.courseId,
                    userId: user.id
                }
            }
        });

        if (purchase) {
            return new NextResponse('Already Purchased', { status: 400 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: course.title,
                        description: course.description?.toString(),
                        // images: course.imageUrl ? [course.imageUrl] : [],
                    },
                    unit_amount: Math.round(course.price! * 100),
                },
            },
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: { userId: user.id },
            select: { stripeCustomerId: true }
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                }
            });
        }

        console.log(process.env.NEXT_PUBLIC_APP_URL);


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            metadata: {
                userId: user.id,
                courseId: course.id,
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer: stripeCustomer.stripeCustomerId,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
