const { PrismaClient } = require("@prisma/client")


const database  = new PrismaClient();

async function main() {
    try {
        await database.category.createMany (
            {
                data: [
                    {
                        name: 'Music'
                    },
                    {
                        name: 'Engineering'
                    },
                    {
                        name: 'Filming'
                    },
                    {
                        name: 'Photography'
                    },
                    {
                        name: 'Computer Science'
                    },
                    {
                        name: 'Accounting'
                    },
                    {
                        name: 'Fitness'
                    }
                ]
            }
        )
        console.log("Success!")
    } catch (error) {
        console.log('error seeding the database categories', error)
    } finally {
        await database.$disconnect()
    }
}

main()