import redisClient from "../redis.js";

export const rateLimiter = (limitAmount, delay) => async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const [response] = await redisClient
    .multi()
    .incr(ip)
    .expire(ip, delay)
    .exec();
  console.log(response[1]);
  if (response[1] > limitAmount) {
    res.json({ loggedIn: false, status: "Too many login attempts" });
  } else next();
};
