import { ITask } from "./Task"

export interface IResponse {
    message: string
    data?: ITask | ITask[]
    status: boolean
}