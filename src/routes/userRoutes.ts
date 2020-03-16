import { check, validationResult } from "express-validator";
import { Router } from "express";
import { User } from "../db/users";
import ash from "express-async-handler";

export default () => {
  const router = Router();

  router.post(
    "/users",
    [
      check("email").isEmail(),
      check("email").custom(async email => {
        if (await User.findOne({ email })) {
          throw new Error("Email already in use");
        }

        return true;
      }),
      check("firstName")
        .not()
        .isEmpty(),
      check("lastName")
        .not()
        .isEmpty()
    ],
    ash(async (req, res) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const { email, firstName, lastName } = req.body;

        await User.create({ firstName, lastName, email });

        return res.send();
      }

      return res.status(400).json({
        errors: errors.array().map(e => ({ param: e.param, msg: e.msg }))
      });
    })
  );

  router.delete(
    "/users/:id",
    ash(async (req, res) => {
      const { id } = req.params;

      await User.deleteOne({ _id: id });

      res.status(204).send();
    })
  );

  return router;
};
