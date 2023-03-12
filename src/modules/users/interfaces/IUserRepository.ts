import { IBaseRepository } from "../../common/interfaces/IBaseRepository";
import { User } from '../entities/User';

export interface IUserRepository extends IBaseRepository<User>{}