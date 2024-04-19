import { UserDbType } from './index'

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}
