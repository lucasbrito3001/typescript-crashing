import { ITask, ITaskDTO } from "src/interfaces/Task";
import { readFileSync, writeFileSync } from 'fs'

const pathJson = 'src/data/Tasks.json'

class TaskModel {
    tasks: ITask[]

    constructor(tasks?: ITask[]) {
        this.tasks = tasks || JSON.parse(readFileSync(pathJson, 'utf-8'))
    }

    findAll(): ITask[] {
        return this.tasks
    }

    findById(id: number): ITask | undefined {
        return this.tasks.find(task => task.id === id)
    }

    create(task: ITaskDTO): ITask {
        const lastId = this.tasks.length > 0 ? this.tasks.slice(-1)[0].id : 0

        const createdTask: ITask = { id: lastId + 1, ...task }

        this.tasks.push(createdTask)

        writeFileSync(pathJson, JSON.stringify(this.tasks))

        return createdTask
    }

    update(id: number, task: ITaskDTO): ITask | undefined {
        let taskIndex: number | undefined = this.tasks.findIndex(task => task.id === id)
        if(taskIndex === -1) return undefined

        let taskUpdated: ITask = { id, ...task }

        this.tasks[taskIndex] = taskUpdated

        writeFileSync(pathJson, JSON.stringify(this.tasks))

        return taskUpdated
    }

    delete(id: number): number | undefined {
        let taskIndex: number | undefined = this.tasks.findIndex(task => task.id === id)
        if(taskIndex === -1) return undefined

        this.tasks.splice(taskIndex, 1)
        writeFileSync(pathJson, JSON.stringify(this.tasks))

        return taskIndex
    }
}

export default TaskModel