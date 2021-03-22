import passportLocal from 'passport-local';
import { User } from '../entity/User';

const strategy = new passportLocal.Strategy(
  { usernameField: 'email', session: false },
  async (email, password, done) => {
    const user = await User.findOne({ email });

    if (!user) {
      await User.noUserVerify();
      return done(null, false);
    }

    if (!(await user.verifyPassword(password))) {
      return done(null, false);
    }

    return done(null, user);
  }
);

export default strategy;
