/* globals describe,it,expect */
import {render} from "@testing-library/vue";
import Main from "../components/Main/Main.vue";
import store from "../stores/store";

describe('Main.vue', () => {
    it('renders actions component', () => {
        const {getByTestId} = render(Main, {store})
        expect(getByTestId('actions')).toBeDefined();
    })

    it('renders task list component', () => {
        const {getByTestId} = render(Main, {store})
        expect(getByTestId('tasks-list')).toBeDefined();
    })
    it('renders add task component', () => {
        const {getByTestId} = render(Main, {store})
        expect(getByTestId('tasks-add')).toBeDefined();
    })
})