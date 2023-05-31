import redisClient from "../redis.js";

export const rateLimiter =
  (limitAmount, delay, type) => async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const [response] = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, delay)
      .exec();
    console.log(response[1]);
    if (type === 1) {
      if (response[1] > limitAmount) {
        res.json({ loggedIn: false, status: "Too many login attempts" });
      }
    } else next();
  };
