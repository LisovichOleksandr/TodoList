import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { v1 } from 'uuid'
import { BASE_URL } from '../api/api'

export const todoListId1 = v1()
export const todoListId2 = v1()

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

const initialState: Array<TodoListType | null> = []
// const initialState = {
// 	todoLists: [] as Array<TodoListType | null>,
// }

// const initialState = [
// 	{
// 		id: todoListId1,
// 		title: 'Friday',
// 		filter: 'all' as FilterValuesType,
// 	},
// 	{
// 		id: todoListId2,
// 		title: 'Saturday',
// 		filter: 'all' as FilterValuesType,
// 	},
// ]

export const giveMeTodoLists = createAsyncThunk(
	'todoList/giveMeTodoLists',
	async (_, thunkAPI) => {
		try {
			const res = await axios(`${BASE_URL}/main`)
			return res.data
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

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
			return state.filter(tl => {
				if (!tl || tl === null) {
					return
				}
				return tl.id !== action.payload
			})
		},
		changeNameTodoListToolkitAC: (
			state,
			action: PayloadAction<ChangeNameTodoListPayload>
		) => {
			state.forEach(tl => {
				if (!tl || tl === null) {
					return
				}
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
				if (!tl || tl === null) {
					return
				}
				if (tl.id === action.payload.todoListId) {
					tl.filter = action.payload.value
				}
			})
		},
	},
	extraReducers: builder => {
		builder.addCase(giveMeTodoLists.fulfilled, (state, action) => {})
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
