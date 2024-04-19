export type ClientDbType = {
    id: number
    user_id: number
    account_number: number
    last_name: string
    first_name: string
    middle_name: string
    birthday: Date
    inn: string
    responsible_full_name: string
    status: string
}

export type UserDbType = {
    id: number
    full_name: string
    login: string
    password: string
}
