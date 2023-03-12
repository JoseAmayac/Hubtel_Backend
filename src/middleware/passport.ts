import passport from 'passport';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import jwtstrategy from 'passport-jwt';
import { AppDataSource } from '../config/db/dataSource';
import { User } from '../modules/users/entities/User';

const JwtStrategy = jwtstrategy.Strategy;

const SECRET_KEY = process.env.SECRET_KEY || 'hjosohoasdfo2y92@dho';

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
    ignoreExpiration: false
};

const authRepository = AppDataSource.getRepository( User );
passport.use(new JwtStrategy(jwtOptions, async ( payload, done ) => {
    try {
        const user = await authRepository.findOneBy({ id: payload.id});
        if( !user ) return done( null, false );

        done( null, user );
    } catch (error) {
        done(error, false);
    }
}));

export default passport;