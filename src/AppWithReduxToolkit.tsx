import { v1 } from 'uuid'

import './App.css'
import TodoList from './TodoList'
import AddItemForm from './components/AddItemForm'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

import { useCallback, useEffect } from 'react'
import { addTodoListInTask } from './store/tasks-slice/tasks-slice'
import {
	addTodoListToolkitAC,
	giveMeTodoLists,
} from './store/todoLists-slice/todoLists-slice'
import { useGetTodoListQuery } from './store/api/api'

// COMPONENT
const AppWithReduxToolkit = () => {
	console.log('Все компоненты в React.memo=(), а все Callback в useCallback()')

	const reduxTodoLists = useAppSelector(state => state.todoListsSlice)
	const dispatch = useAppDispatch()

	// const { data, error, isLoading } = useGetTodoListQuery('sd')

	useEffect(() => {
		dispatch(giveMeTodoLists())
	}, [])

	const addTodoList = useCallback(
		(title: string) => {
			let id = v1()
			dispatch(addTodoListInTask({ id }))
			dispatch(addTodoListToolkitAC({ id, title }))
		},
		[dispatch, addTodoListInTask, addTodoListToolkitAC]
	)

	// RETURN
	return (
		<div className='App'>
			<header className='App-header '>
				<h3>Add TodoList</h3>
				<AddItemForm addItem={addTodoList} />
			</header>
			<div className='main'>
				{reduxTodoLists.map(ts => {
					if (ts)
						return (
							<TodoList
								key={ts.id}
								id={ts.id}
								title={ts.title}
								filter={ts.filter}
							/>
						)
				})}
			</div>
		</div>
	)
}

export default AppWithReduxToolkit
