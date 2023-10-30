/* globals describe,it,expect */
import {fireEvent, queryByText, render} from "@testing-library/vue";
import Add from "../components/Main/Tasks/Add/Add.vue";
import store from "../stores/store";

describe('Add.vue', () => {
    describe('UI', () => {
        it('has a button to show add task modal', () => {
            const {getByTestId} = render(Add, {store})
            expect(getByTestId('add-task-modal-button')).toBeDefined()
        })
        it('has add task modal', () => {
            const {getByTestId} = render(Add, {store})
            expect(getByTestId('add-task-modal')).toBeDefined()
        })
        it('hides add task modal on default', () => {
            const {getByTestId} = render(Add, {store})
            expect(getByTestId('add-task-modal').style.display).toEqual('')
        })
        it('shows add task modal when clicking on button', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('add-task-modal').style.display).not.toEqual('none')
        })
        it('has a close button', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('close-modal-button')).toBeDefined()
        })
        it('hides modal when clicking on close icon', async () => {
            const {getByTestId} = await renderWithModal()
            const closeButton = getByTestId('close-modal-button')
            await fireEvent.click(closeButton)
            expect(getByTestId('add-task-modal').style.display).toEqual('')
        })
        it('has an input for task name in modal', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('input-task-title')).toBeDefined();
        })
        it('has an input for task date in modal', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('input-task-date')).toBeDefined();
        })
        it('has a button to add new task in list', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('add-task-button')).toBeDefined();
        })
        it('renders inputs in modal with empty value by default', async () => {
            const {getByTestId} = await renderWithModal()
            expect(getByTestId('input-task-title').value).toEqual('');
            expect(getByTestId('input-task-date').value).toBeUndefined();
        })
        it('shows error when task fields are empty and we click on submit', async () => {
            const {getByTestId, queryByText} = await renderWithModal()
            const button = getByTestId('add-task-button')
            await fireEvent.click(button)
            expect(queryByText('Task title is required')).not.toBeNull()
        })
        it('shows error when a task field is empty and blur event trigger on that input', async () => {
            const {getByTestId, queryByText} = await renderWithModal()
            const taskNameInput = getByTestId('input-task-title')
            await fireEvent.update(taskNameInput, '')
            await fireEvent.blur(taskNameInput)
            expect(queryByText('Task title is required')).not.toBeNull()
        })
        it('hides modal when clicking on submit button', async () => {
            const {getByTestId} = await renderWithModal()
            const date = new Date().toISOString().split('T')[0]
            const taskNameInput = getByTestId('input-task-title')
            const taskDateInput = getByTestId('input-task-date')
            await fireEvent.update(taskNameInput, 'Task 1')
            await fireEvent.update(taskDateInput, date)
            expect(getByTestId('add-task-modal').style.display).toEqual('')
        })
    })

    describe('Vuex', () => {
        it('adds new task to store when clicking on submit button', async () => {
            const date = new Date().toISOString().split('T')[0]
            const {getByTestId} = await renderWithModal({
                data() {
                    return {
                        date: date,
                        title: 'Task 1',
                    }
                }
            })
            const button = getByTestId('add-task-button')
            await fireEvent.click(button)
            expect(store.state.task.tasks[0].id).toEqual(1);
            expect(store.state.task.tasks[0].title).toEqual('Task 1');
            expect(store.state.task.tasks[0].date).toEqual(date);
            expect(store.state.task.tasks[0].status).toEqual('pending');
        })
    })
})

//Utils
async function renderWithModal(customData = {}) {
    const {queryByText, getByTestId} = render(
        Add,
        {store, ...customData}
    )
    const button = getByTestId('add-task-modal-button');
    await fireEvent.click(button);
    return {getByTestId, queryByText}
}