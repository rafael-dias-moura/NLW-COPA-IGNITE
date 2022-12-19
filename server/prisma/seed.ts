import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Rafael dias",
            email: "dias416@gmail.com",
            avatarUrl: "https://github.com/rafael-dias-moura.png",
        }
    })
    
    const pool = await prisma.pool.create({
        data: {
            title: "Example pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date : '2022-11-24T16:00:00.177Z',
            firstTeamCountryCode: 'RS',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date : '2022-12-02T16:00:00.177Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'KM',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()