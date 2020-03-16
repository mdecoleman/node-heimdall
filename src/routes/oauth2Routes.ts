import { ensureLoggedIn, authenticateBearerToken } from "../auth";
import { Router } from "express";
import ash from "express-async-handler";
import { create } from "../token";

export default () => {
  const router = Router();

  router.get(
    "/user-info",
    authenticateBearerToken(),
    ash(async (req, res) => {
      return res.json(req.user);
    })
  );

  router.post(
    "/token",
    ensureLoggedIn(),
    ash(async (req, res) => {
      const user: any = req.user;

      return res.json({
        access_token: create({ sub: user._id, exp: 300, email: user.email })
      });
    })
  );

  return router;
};
