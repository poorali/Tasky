/* globals describe,it,expect */
import {render} from "@testing-library/vue";
import store from "../stores/store";
import List from "../components/Main/Tasks/List/List.vue";

describe('List.vue', () => {
    describe('UI', function () {
        it('has a list container', () => {
            const {getByTestId} = renderWithCustomStore()
            expect(getByTestId('tasks-list')).toBeDefined();
        })
    });
    describe('State', () => {
        it('shows not found when there is no record', () => {
            const {queryByText} = renderWithCustomStore()
            expect(queryByText('There is no task')).not.toBeNull()
        })
        it('shows list item component for each item', () => {
            const {getByTestId} = renderWithCustomStore([{id: 1, status: 'pending', title:'task 1'}, {id: 2,status:'pending', title:'task 2'}])
            expect(getByTestId('task-item-0')).toBeDefined()
            expect(getByTestId('task-item-1')).toBeDefined()
        })
        it('shows list item in order', () => {
            const {getByTestId} = renderWithCustomStore([{id: 1, status: 'pending', title:'First'}, {id: 2,status:'pending', title:'Second'}])
            expect(getByTestId('task-item-0').textContent).toContain('First')
            expect(getByTestId('task-item-1').textContent).toContain('Second')
        })
        it('shows pending tasks by default', () => {
            const {getByTestId} = renderWithCustomStore(
                [
                    {id: 1, status: 'completed', title: 'Completed'},
                    {id: 2, status: 'deleted', title: 'Deleted'},
                    {id: 3, status: 'pending', title: 'Pending'},
                ]
            )
            expect(getByTestId('task-item-0').textContent).toContain('Pending')
            expect(getByTestId('task-item-0').textContent).not.toContain('Completed')
            expect(getByTestId('task-item-0').textContent).not.toContain('Deleted')
        })
        it('shows tasks sort by date', () => {
            const {getByTestId} = renderWithCustomStore(
                [
                    {id: 1, status: 'pending', title: 'pending 1', date: '2023-12-12'},
                    {id: 2, status: 'pending', title: 'Pending 2', date: '2023-12-11'},
                ]
            )
            expect(getByTestId('task-item-0').textContent).toContain('Pending 2')
        })
        it('shows today tasks when filter switched to today', () => {
            const today = new Date().toISOString().split('T')[0]
            const {getByTestId} = renderWithCustomStore(
                [
                    {id: 1, status: 'pending', title: 'pending 1', date: '2023-12-12'},
                    {id: 2, status: 'pending', title: 'Pending 2', date: today},
                ],
                ''
                ,
                'today'
            )
            expect(getByTestId('task-item-0').textContent).toContain('Pending 2')
            expect(getByTestId('task-item-0').textContent).not.toContain('Pending 1')
        })
        it('shows completed tasks when filter switched to completed', () => {
            const today = new Date().toISOString().split('T')[0]
            const {getByTestId} = renderWithCustomStore(
                [
                    {id: 1, status: 'pending', title: 'pending 1', date: '2023-12-12'},
                    {id: 2, status: 'pending', title: 'Pending 2', date: today},
                    {id: 3, status: 'completed', title: 'Completed', date: today},
                ],
                ''
                ,
                'completed'
            )
            expect(getByTestId('task-item-0').textContent).toContain('Completed')
            expect(getByTestId('task-item-0').textContent).not.toContain('Pending 1')
            expect(getByTestId('task-item-0').textContent).not.toContain('Pending 2')
        })
        it('shows search tasks when query is changed', () => {
            const {getByTestId} = renderWithCustomStore(
                [
                    {id: 1, status: 'pending', title: 'Pending 1', date: '2023-12-12'},
                    {id: 2, status: 'completed', title: 'Pending 2', date: '2023-12-13'},
                    {id: 2, status: 'deleted', title: 'deleted pending', date: '2023-12-12'},
                    {id: 2, status: 'pending', title: 'task', date: '2023-12-12'},
                ],
                'pend'
                ,
                'today'
            )
            expect(getByTestId('task-item-0').textContent).toContain('Pending 1')
            expect(getByTestId('task-item-1').textContent).toContain('Pending 2')
            expect(getByTestId('task-item-0').textContent).not.toContain('deleted pending')
            expect(getByTestId('task-item-0').textContent).not.toContain('task')
        })
        it('shows not found when searched task is not found', () => {
            const {queryByText} = renderWithCustomStore(
                [
                    {id: 1, status: 'pending', title: 'task', date: '2023-12-12'},
                ],
                'pend'
            )
            expect(queryByText('There is no task')).not.toBeNull()
        })

    })
})

//Utils
function renderWithCustomStore(tasks = [], searchQuery = '', filter = 'pending') {
    return render(
        List,
        {
            store: {...store, ...{state: {...store.state, ...{tasks, searchQuery, filter}}}}
        }
    )
}