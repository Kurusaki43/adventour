import { User } from '@models/user.model'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { env } from './env'

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract info
        const email = profile.emails?.[0].value
        let user = await User.findOne({ email })

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0].value,
            provider: 'google',
            isVerified: true,
            isActive: true
          })
        }

        // Instead of "done(user)", pass minimal info
        return done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)
export default passport
