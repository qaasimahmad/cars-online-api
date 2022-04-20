module.exports = {
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://kassim:kassim@cluster0.mr3sb.mongodb.net/carshop",
  appPort: process.env.PORT || 4800,
  passSecret: process.env.PASS_SECRET || "kassdev",
  jwtSecret: process.env.JWT_SECRET || "kassdev",
};
