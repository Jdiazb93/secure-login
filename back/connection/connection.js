const PrismaClient = require('@prisma/client')

const prisma = new PrismaClient.PrismaClient()

module.exports = { prisma }