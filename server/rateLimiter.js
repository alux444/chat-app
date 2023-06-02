import pool from "../db.js";

export const rateLimiter =
  (limitAmount, delay, type) => async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    try {
      const client = await pool.connect();
      let response;
      let query;

      if (type === 1) {
        // For login attempts rate limiting
        query = `
          UPDATE rate_limiter
          SET count = count + 1, expiry = NOW() + interval '${delay} seconds'
          WHERE ip_address = $1
          RETURNING count
        `;
      } else {
        // For other types of rate limiting
        query = `
          INSERT INTO rate_limiter (ip_address, count, expiry)
          VALUES ($1, 1, NOW() + interval '${delay} seconds')
          ON CONFLICT (ip_address) DO UPDATE
          SET count = rate_limiter.count + 1, expiry = EXCLUDED.expiry
          RETURNING count
        `;
      }

      // Execute the query
      response = await client.query(query, [ip]);
      const count = response.rows[0].count;

      if (count > limitAmount) {
        res.json({ loggedIn: false, status: "Too many login attempts" });
      } else {
        next();
      }

      client.release();
    } catch (error) {
      console.error("Error executing rate limiter query:", error);
      res.sendStatus(500);
    }
  };
