import * as dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata";
import './config';
import { init } from './config/ioc/inversify.config';

const port: number = Number(process.env.PORT) || 3000;
init( port );