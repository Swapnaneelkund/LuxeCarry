import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/user-model.js';

export default function configureGoogleStrategy(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ googleId: profile.id });

          if (!user) {
            user = await userModel.create({
              googleId: profile.id,
              fullname: profile.displayName,
              email: profile.emails?.[0].value,
              picture: profile.photos?.[0].value,
            });
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}
