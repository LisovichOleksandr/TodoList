import { userReducer } from './userReducer'

test('user reducer should increment only age', () => {
	const startState = {
		age: 34,
		children: 1,
		name: 'Alex',
	}
	const endState = userReducer(startState, { type: 'INCREMENT-AGE' })
	expect(endState.age).toBe(35)
	expect(endState.children).toBe(1)
})

test('user reducer should increment only children', () => {
	const startState = {
		age: 34,
		children: 1,
		name: 'Alex',
	}
	const endState = userReducer(startState, { type: 'INCREMENT-CHILD' })
	expect(endState.age).toBe(34)
	expect(endState.children).toBe(2)
})

test('user reducer should change name', () => {
	const startState = {
		age: 34,
		children: 1,
		name: 'Alex',
	}
	let newName = 'Alexander'
	const endState = userReducer(startState, {
		type: 'CHANGE-NAME',
		name: newName,
	})
	expect(endState.name).toBe(newName)
})
