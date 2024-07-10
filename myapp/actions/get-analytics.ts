import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWthCourse = Purchase & {
    course: Course;
}

const groupByCourse = (purchases: PurchaseWthCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {}
    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0
        }
        grouped[courseTitle] += purchase.course.price!;
    })

    return grouped
}

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId
                }
            },
            include: {
                course: true
            }
        })

        const groupedEarnings = groupByCourse(purchases);
        const data = Object.entries(groupedEarnings).map(([courseTitle, total]: [string, number]) => ({
            name: courseTitle,
            total: total,
        }))
        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
        const totalSales = purchases.length

        return {
            totalRevenue,
            totalSales,
            data,
        }
    } catch (error) {
        console.log("[GET ANLYTICS", error)
        return {
            totalRevenue: 0,
            totalSales: 0,
            data: [],
        }
    }
}