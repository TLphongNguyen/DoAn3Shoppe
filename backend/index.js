const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const rootRouter = require("./src/routes")
const cors = require('cors');
const errorMiddleware = require("./src/middlewares/error")
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// Khởi tạo PrismaClient
const prismaClient = new PrismaClient({
  log: ['query'],
});
app.use(express.json());
// Sử dụng middleware cho router
app.use("/api", rootRouter);
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
app.use(errorMiddleware)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

});
module.exports = prismaClient
