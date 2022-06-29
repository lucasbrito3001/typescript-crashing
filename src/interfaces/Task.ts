export interface ITask {
    id: number
    title: string
    description: string
    completed: boolean
}

export interface ITaskDTO {
    title: string
    description: string
    completed: boolean
}

export interface ITaskModel {
    tasks: ITask[]

    findAll(): ITask[]
    findById(id: number): ITask | undefined
    create(task: ITaskDTO): ITask
    update(id: number, task: ITaskDTO): ITask | undefined
    delete(id: number): number | undefined
}