import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { ActionAddTodoType, ActionRemoveTodoType } from './todolists-reducer'

export const taskReducer = (
	state: TasksStateType,
	action: ActionType
): TasksStateType => {
	switch (action.type) {
		case 'ADD-TASK':
			const task = { id: v1(), title: action.value, isDone: false }
			return {
				...state,
				[action.todoListId]: [task, ...state[action.todoListId]],
			}
		case 'DELETE-TASK':
			const tasks = state[action.todoListId].filter(ts => ts.id !== action.id)
			return {
				...state,
				[action.todoListId]: tasks,
			}
		case 'CHANGE-TASK': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todoListId]
			const task = tasks.find(t => t.id === action.taskId)
			if (task) {
				task.title = action.title
			}
			return stateCopy
		}
		case 'CHANGE-STATUS': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todoListId]
			const task = tasks.find(t => t.id === action.taskId)
			if (task) {
				task.isDone = action.isDone
			}
			return stateCopy
		}
		case 'ADD-TODO': {
			return {
				...state,
				[action.todoListId]: [],
			}
		}
		case 'REMOVE-TODO': {
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
		}
		default:
			throw new Error('I don`t understand this action type')
	}
}

type ActionType =
	| AddTaskType
	| DeleteTaskType
	| ChangeTaskType
	| ChangeStatusType
	| ActionAddTodoType
	| ActionRemoveTodoType

export type AddTaskType = {
	type: 'ADD-TASK'
	todoListId: string
	value: string
}
type DeleteTaskType = {
	type: 'DELETE-TASK'
	id: string
	todoListId: string
}
type ChangeTaskType = {
	type: 'CHANGE-TASK'
	title: string
	todoListId: string
	taskId: string
}
type ChangeStatusType = {
	type: 'CHANGE-STATUS'
	taskId: string
	isDone: boolean
	todoListId: string
}

export const addTaskAC = (todoListId: string, value: string): AddTaskType => {
	return {
		type: 'ADD-TASK',
		todoListId,
		value,
	}
}

export const deleteTaskAC = (
	id: string,
	todoListId: string
): DeleteTaskType => {
	return {
		type: 'DELETE-TASK',
		id,
		todoListId,
	}
}

export const changeTaskAC = (
	title: string,
	todoListId: string,
	taskId: string
): ChangeTaskType => {
	return {
		type: 'CHANGE-TASK',
		title,
		taskId,
		todoListId,
	}
}
export const changeStatusAC = (
	taskId: string,
	isDone: boolean,
	todoListId: string
): ChangeStatusType => {
	return {
		type: 'CHANGE-STATUS',
		isDone,
		taskId,
		todoListId,
	}
}

// type RemoveTaskACType = ReturnType<typeof removeTaskAC>

// export const removeTaskAC = (id: string) => {
// 	return {
// 		type: 'REMOVE-TODO',
// 		id,
// 	} as const
// }
