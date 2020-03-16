import { authenticateEmailToken } from "../auth";
import { AuthorizationCode } from "../db/authorizationCodes";
import { check, validationResult } from "express-validator";
import { Router } from "express";
import { User } from "../db/users";
import { v4 as uuidV4 } from "uuid";
import ash from "express-async-handler";

export default () => {
  const router = Router();

  router.post(
    "/signin/email",
    [check("email").isEmail()],
    ash(async (req, res) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const { email } = req.body;
        const user: any = await User.findOne({ email });

        if (user) {
          const authorizationCode: any = await AuthorizationCode.create({
            code: uuidV4(),
            userId: user._id
          });

          console.log(authorizationCode.code);
        }

        return res.send();
      }

      return res.status(400).json({
        errors: errors.array().map((e: any) => ({ param: e.param, msg: e.msg }))
      });
    })
  );

  router.post(
    "/signin/email/callback",
    authenticateEmailToken(),
    ash(async (req, res) => {
      console.log(req.user);
      return res.send();
    })
  );

  router.post("/signout", (req, res, next) => {
    req.logOut();
    res.status(204).send();
  });

  return router;
};
