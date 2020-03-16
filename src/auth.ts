import { AuthorizationCode } from "./db/authorizationCodes";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { Strategy as CustomStrategy } from "passport-custom";
import { User } from "./db/users";
import { verify } from "./token";
import passport from "passport";

export const ensureLoggedIn = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }
};

export const signOutIfUserDisabled = () => async (req, res, next) => {
  const user: any = req.user;

  if (req.isAuthenticated() && user.disabled) {
    req.logOut();
    return res.status(401).send();
  }

  return next();
};

export const initAuth = server => {
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(signOutIfUserDisabled());

  passport.use(
    "email-token",
    new CustomStrategy(async (req, cb) => {
      const { code } = req.body;

      if (code) {
        const authorizationCode: any = await AuthorizationCode.findOne({
          code
        });

        if (authorizationCode) {
          await AuthorizationCode.deleteOne({ _id: authorizationCode._id });

          const user: any = await User.findOne({
            _id: authorizationCode.userId
          });
          console.log(user);
          return cb(null, user);
        }
      }

      return cb(null, false);
    })
  );

  passport.use(
    new BearerStrategy(async (token, done) => {
      const verifyResponse: any = verify(token);

      if (verifyResponse.isValid) {
        const { sub } = verifyResponse.token;

        const user: any = await User.findOne({
          _id: sub
        });

        if (user) {
          return done(null, user);
        }
      }

      return done(null, false);
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }).then((user: any) => {
      console.log(user);
      done(null, user);
    });
  });
};

export const authenticateEmailToken = () =>
  passport.authenticate("email-token");

export const authenticateBearerToken = () =>
  passport.authenticate("bearer", { session: false });
