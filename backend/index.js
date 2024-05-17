const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const rootRouter = require("./src/routes")
const cors = require('cors');
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// Khởi tạo PrismaClient
const prismaClient = new PrismaClient({
  log: ['query'],
});
app.use(express.json());
// Sử dụng middleware cho router
app.use("/api", rootRouter);

app.get('/hello', function (req, res) {
  res.send("<h2>This is my first app</h2>");
})
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

});
module.exports = prismaClient
