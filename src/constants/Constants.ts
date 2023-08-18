import { Task } from '../types/Task'

export const initTodoList: Task[] = [
  {
    _id: 1,
    title: 'Todo 1',
    desc: 'Todo description',
    color: 'lightgreen',
    image:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
    status: true,
    createAt: new Date('2023-08-18 11:18').getTime(),
    updatedAt: new Date('2023-08-18 11:18').getTime()
  },
  {
    _id: 2,
    title: 'Todo 2',
    desc: 'Todo description',
    color: 'lightgreen',
    image:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
    status: true,
    createAt: new Date('2023-08-20 11:18').getTime(),
    updatedAt: new Date('2023-08-20 11:18').getTime()
  },
  {
    _id: 3,
    title: 'Todo 3',
    desc: 'Todo description',
    color: 'lightgreen',
    image:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
    status: true,
    createAt: new Date('2023-08-19 11:19').getTime(),
    updatedAt: new Date('2023-08-19 11:19').getTime()
  },
  {
    _id: 4,
    title: 'Todo 4',
    desc: 'Todo description',
    color: 'lightgreen',
    image:
      'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
    status: true,
    createAt: new Date('2023-08-18 11:18').getTime(),
    updatedAt: new Date('2023-08-18 11:18').getTime()
  }
]
