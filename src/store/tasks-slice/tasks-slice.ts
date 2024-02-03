import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'
import { todoListId1, todoListId2 } from '../todoLists-slice/todoLists-slice'

const initialState = {
	[todoListId1]: [
		{ id: v1(), title: 'HTML', isDone: true },
		{ id: v1(), title: 'CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: false },
		{ id: v1(), title: 'TypeScript', isDone: true },
	],
	[todoListId2]: [
		{ id: v1(), title: 'React', isDone: true },
		{ id: v1(), title: 'Redux', isDone: true },
		{ id: v1(), title: 'Toolkit', isDone: true },
	],
}

export const tasksSlice = createSlice({
	name: 'tasksSlice',
	initialState,
	reducers: {
		addTodoListInTask: (state, { payload }) => {
			state[payload.id] = []
		},
		removeTodoListInTask: (state, { payload }) => {
			delete state[payload]
		},
		addTaskToolkitAC: (state, action: PayloadAction<AddTaskPayload>) => {
			state[action.payload.todoListId].unshift({
				id: v1(),
				title: action.payload.value,
				isDone: false,
			})
		},
		deleteTaskToolkitAC: (state, action: PayloadAction<DeleteTaskPayload>) => {
			state[action.payload.todoListId] = state[
				action.payload.todoListId
			].filter(ts => ts.id !== action.payload.id)
		},
		changeTaskToolkitAC: (state, action: PayloadAction<ChangeTaskPayload>) => {
			state[action.payload.todoListId].forEach(ts => {
				if (ts.id === action.payload.taskId) {
					ts.title = action.payload.title
				}
			})
		},
		changeStatusToolkitAC: (
			state,
			action: PayloadAction<ChangeStatusPayload>
		) => {
			state[action.payload.todoListId].forEach(ts => {
				if (ts.id === action.payload.taskId) {
					ts.isDone = action.payload.isDone
				}
			})
		},
	},
})
type AddTaskPayload = { value: string; todoListId: string }
type DeleteTaskPayload = { id: string; todoListId: string }
type ChangeTaskPayload = { title: string; todoListId: string; taskId: string }
type ChangeStatusPayload = {
	taskId: string
	isDone: boolean
	todoListId: string
}

export const {
	addTodoListInTask,
	removeTodoListInTask,
	addTaskToolkitAC,
	deleteTaskToolkitAC,
	changeTaskToolkitAC,
	changeStatusToolkitAC,
} = tasksSlice.actions
