/* globals describe,it,expect */
import {fireEvent, render, within} from "@testing-library/vue";
import store from "../stores/store";
import Item from "../components/Main/Tasks/List/Item/Item.vue";
import Main from "../components/Main/Main.vue";


// Generate an array of 20 objects
const mockTasks = Array.from({length: 20}, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    date: randomDate(),
    status: randomStatus(),
}));

describe('Item.vue', () => {

    describe('UI', function () {
        it('has task item title', () => {
            const {getByTestId} = renderWithCustomStore(mockTasks[0]);
            expect(getByTestId('task-item-title')).toBeDefined();
            expect(getByTestId('task-item-title').textContent).toContain(mockTasks[0].title);
        })
        it('has task item date if exists', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'pending'}});
            expect(getByTestId('task-item-date')).toBeDefined();
            expect(getByTestId('task-item-date').textContent).toContain(mockTasks[0].date);

        })
        it('hide task item date if not exists', () => {
            const {queryByTestId} = renderWithCustomStore({...mockTasks[0], ...{date: ''}});
            expect(queryByTestId('task-item-date')).toBeNull();
        })
        it('has task delete button', () => {
            const {getByTestId} = renderWithCustomStore(mockTasks[0]);
            expect(getByTestId('task-item-delete')).toBeDefined();
        })
        it('has task edit button', () => {
            const {getByTestId} = renderWithCustomStore(mockTasks[0]);
            expect(getByTestId('task-item-edit')).toBeDefined();
        })
        it('has check box button', () => {
            const {getByTestId} = renderWithCustomStore(mockTasks[0]);
            expect(getByTestId('task-item-check')).toBeDefined();
        })
        it('renders checked checkbox if status is completed', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'completed'}});
            expect(getByTestId('task-item-check').checked).toBe(true)
        })
        it('renders unchecked checkbox if status is pending', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'pending'}});
            expect(getByTestId('task-item-check').checked).not.toBe(true)
        })
        it('shows text "today" instead of date', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status:'pending',date: new Date().toISOString().split('T')[0]}});
            expect(getByTestId('task-item-date').textContent.toLowerCase()).toContain('today')
        })
        it('shows text "completed" instead of date', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'completed'}});
            expect(getByTestId('task-item-date').textContent.toLowerCase()).toContain('completed')
        })
        it('shows text "overdue alert" instead of date', () => {
            const date = new Date();
            date.setDate(date.getDate() - 2)
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status:'pending',date: date.toISOString().split('T')[0]}});
            expect(getByTestId('task-item-date').textContent.toLowerCase()).toContain('overdue')

        })
    });
    describe('State', () => {
        it('changes task state on click on check box', async () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'pending'}}, [mockTasks[0]]);
            await fireEvent.click(getByTestId('task-item-check'))
            expect(store.state.tasks[0].status).toEqual('completed')
        })
        it('changes task state to pending on click on check box again', async () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0], ...{status: 'completed'}}, [mockTasks[0]]);
            await fireEvent.click(getByTestId('task-item-check'))
            expect(store.state.tasks[0].status).toEqual('pending')
        })
        it('shows add task modal by clicking on edit button', async () => {
            const {getByTestId} = renderMain([{...mockTasks[0], ...{status: 'pending'}}])
            const editButton = within(getByTestId('task-item-0')).getByTestId('task-item-edit');
            await fireEvent.click(editButton);
            expect(getByTestId('add-task-modal').style.display).toBeDefined();

        })
        it('shows task title on edit modal by clicking on edit button', async () => {
            const {getByTestId} = renderMain([{...mockTasks[0], ...{status: 'pending'}}])
            const editButton = within(getByTestId('task-item-0')).getByTestId('task-item-edit');
            await fireEvent.click(editButton);
            expect(getByTestId('input-task-title').value).toEqual(mockTasks[0].title)
        })
        it('updates task title after clicking on save button', async () => {
            const {getByTestId} = renderMain([{...mockTasks[0], ...{status: 'pending'}}])
            const editButton = within(getByTestId('task-item-0')).getByTestId('task-item-edit');
            const titleInput = getByTestId('input-task-title');
            const submitButton = getByTestId('add-task-button');
            await fireEvent.click(editButton);
            await fireEvent.update(titleInput, 'Updated Task')
            await fireEvent.click(submitButton);
            expect(store.state.tasks[0].title).toEqual('Updated Task')
        })
        it('shows task delete confirm dialog by clicking on delete button', async() => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0],...{status:'pending'}})
            const deleteButton = getByTestId('task-item-delete');
            fireEvent.click(deleteButton);
            expect(getByTestId('task-item-delete-modal')).toBeDefined()
        })
        it('has a no button in confirm modal', async() => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0],...{status:'pending'}})
            const deleteButton = getByTestId('task-item-delete');
            fireEvent.click(deleteButton);
            expect(getByTestId('task-item-delete-no')).toBeDefined()
        })
        it('has a yes button in confirm modal', async() => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0],...{status:'pending'}})
            const deleteButton = getByTestId('task-item-delete');
            fireEvent.click(deleteButton);
            expect(getByTestId('task-item-delete-yes')).toBeDefined()
        })
        it('closes task delete confirm by clicking on no', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0],...{status:'pending'}},[mockTasks[0]])
            const deleteButton = getByTestId('task-item-delete');
            const noButton = getByTestId('task-item-delete-no');
            fireEvent.click(deleteButton);
            fireEvent.click(noButton);
            expect(store.state.tasks[0].status).toEqual('pending')
        })
        it('deletes task delete confirm by clicking on yes', () => {
            const {getByTestId} = renderWithCustomStore({...mockTasks[0],...{status:'pending'}},[mockTasks[0]])
            const deleteButton = getByTestId('task-item-delete');
            const yesButton = getByTestId('task-item-delete-yes');
            fireEvent.click(deleteButton);
            fireEvent.click(yesButton);
            expect(store.state.tasks[0].status).toEqual('deleted')
        })
    })
})
//Utils
function renderWithCustomStore(task, tasks = []) {
    store.state.tasks = tasks;
    return render(
        Item,
        {
            props: {
                task
            },
            store
        }
    )
}

function renderMain(tasks = []) {
    store.state.tasks = tasks;
    return render(
        Main,
        {
            store
        }
    )
}

// Function to generate a random date
function randomDate() {
    const today = new Date();
    const randomDay = new Date(today.getTime() + Math.random() * (30 * 24 * 60 * 60 * 1000));
    const year = randomDay.getFullYear();
    const month = String(randomDay.getMonth() + 1).padStart(2, '0');
    const day = String(randomDay.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to generate a random status
function randomStatus() {
    const statuses = ['pending', 'completed', 'deleted'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}