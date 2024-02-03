import { configureStore } from '@reduxjs/toolkit'
import { tasksSlice } from './tasks-slice/tasks-slice'
import { todoListsSlice } from './todoLists-slice/todoLists-slice'

export const store = configureStore({
	reducer: {
		[todoListsSlice.name]: todoListsSlice.reducer,
		[tasksSlice.name]: tasksSlice.reducer,
	},
	devTools: true,
})

// @ts-ignore
window.store = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
