import redisClient from "../redis.js";

export const rateLimiter = (limitAmount) => async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const [response] = await redisClient.multi().incr(ip).expire(ip, 60).exec();
  console.log(response[1]);
  if (response[1] > limitAmount) {
    res.json({ loggedIn: false, status: "Too many login attempts" });
  } else next();
};
