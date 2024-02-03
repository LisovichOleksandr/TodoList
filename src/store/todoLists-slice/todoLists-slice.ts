import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState = [
	{
		id: todoListId1,
		title: 'Friday',
		filter: 'all' as FilterValuesType,
	},
	{
		id: todoListId2,
		title: 'Saturday',
		filter: 'all' as FilterValuesType,
	},
]

export const todoListsSlice = createSlice({
	name: 'todoListsSlice',
	initialState,
	reducers: {
		addTodoListToolkitAC: (
			state,
			action: PayloadAction<AddTodoListPayload>
		) => {
			state.push({
				id: action.payload.id,
				title: action.payload.title,
				filter: 'all',
			})
		},
		removerTodoListToolkitAC: (state, action: PayloadAction<string>) => {
			return state.filter(tl => tl.id !== action.payload)
		},
		changeNameTodoListToolkitAC: (
			state,
			action: PayloadAction<ChangeNameTodoListPayload>
		) => {
			state.forEach(tl => {
				if (tl.id === action.payload.todoListId) {
					tl.title = action.payload.title
				}
			})
		},
		filterTodoListToolkitAC: (
			state,
			action: PayloadAction<ChangeFilterPayload>
		) => {
			state.forEach(tl => {
				if (tl.id === action.payload.todoListId) {
					tl.filter = action.payload.value
				}
			})
		},
	},
})
export type FilterValuesType = 'all' | 'completed' | 'active'

type ChangeFilterPayload = { value: FilterValuesType; todoListId: string }
type AddTodoListPayload = { id: string; title: string }
type ChangeNameTodoListPayload = { title: string; todoListId: string }

export const {
	addTodoListToolkitAC,
	filterTodoListToolkitAC,
	removerTodoListToolkitAC,
	changeNameTodoListToolkitAC,
} = todoListsSlice.actions
