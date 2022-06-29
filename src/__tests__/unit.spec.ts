import TaskModel from '../models/TaskModel'

describe('> Test task models', () => {
    it('should be return a task filtered by id', () => {
        const mockedTasks = [
            { id: 1, title: 'task mock 1', description: 'a task mocked to test the get by id model', completed: false },
            { id: 2, title: 'task mock 2', description: 'a task mocked to test the get by id model', completed: false },
            { id: 3, title: 'task mock 3', description: 'a task mocked to test the get by id model', completed: false }
        ]

        const model = new TaskModel(mockedTasks)

        const task = model.findById(2)

        expect(task?.id).toBe(2)
        expect(task?.title).toBe('task mock 2')
    })
})