/* globals describe, it, expect*/
import {fireEvent, render} from "@testing-library/vue";
import FilterOption from "../components/FilterOption/FilterOption.vue";
import store from "../stores/store";

describe('FilterOptions.vue', function () {
    describe('UI', () => {
        it('has a filter for all', () => {
            const {getByTestId} = renderWithStore([])
            expect(getByTestId('task-filter-all')).toBeDefined();
        })
        it('has a filter for today', () => {
            const {getByTestId} = renderWithStore([])
            expect(getByTestId('task-filter-today')).toBeDefined();
        })
        it('has a filter for completed', () => {
            const {getByTestId} = renderWithStore([])
            expect(getByTestId('task-filter-completed')).toBeDefined();
        })
    })

    describe('State', () => {
        it('shows tasks count for all tasks', () => {
            const {getByTestId} = renderWithStore([
                {id: 1, title: 'task 1', date: '', status: 'pending'},
                {id: 2, title: 'task 2 ', date: '', status: 'pending'},
                {id: 3, title: 'task 3 ', date: '', status: 'completed'},
            ])
            expect(getByTestId('task-filter-all-count').textContent).toContain('2');
        })
        it('shows tasks count for today tasks', () => {
            const {getByTestId} = renderWithStore([
                {id: 1, title: 'task 1', date: store.state.today, status: 'pending'},
                {id: 2, title: 'task 2 ', date: '', status: 'pending'},
                {id: 3, title: 'task 3 ', date: '', status: 'completed'},
            ])
            expect(getByTestId('task-filter-today-count').textContent).toContain('1');
        })
        it('changes filter to all state on click on options', async() => {
            const {getByTestId} = renderWithStore([],'today')
            await fireEvent.click(getByTestId('task-filter-all'))
            expect(store.state.filter).toEqual('pending')
        })
        it('changes filter today state on click on options', async() => {
            const {getByTestId} = renderWithStore([],'pending')
            await fireEvent.click(getByTestId('task-filter-today'))
            expect(store.state.filter).toEqual('today')
        })
        it('changes filter completed state on click on options', async() => {
            const {getByTestId} = renderWithStore([],'pending')
            await fireEvent.click(getByTestId('task-filter-completed'))
            expect(store.state.filter).toEqual('completed')
        })
    })
});

function renderWithStore(tasks = [], filter = 'pending') {
    store.state.tasks = tasks;
    store.state.filter = filter;
    return render(
        FilterOption,
        {
            store
        }
    )
}