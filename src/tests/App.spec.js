/* globals describe, expect, it */
import App from "../App.vue";
import {render} from "@testing-library/vue";
import store from "../stores/store";

describe("App.vue", () => {
    describe('Welcome Dialog', () => {
        it('has  to render a Welcome dialog on load', () => {
            const {getByTestId} = renderWithUser({state: {user: null}})
            expect(getByTestId('welcome-dialog')).toBeDefined();
        })

        it('has to render welcome dialog if user state does not exists', () => {
            const {queryByTestId} = renderWithUser({
                state: {user: {name: 'Nima', registerDate: '2023-12-12'}}
            })
            expect(queryByTestId('welcome-dialog')).toBeNull();
        })
    })

    describe('Nav' , () => {
        it('has to render nav component only if user state exists', () => {
            const {getByTestId} = renderWithUser({
                state: {user: {name: 'Nima', registerDate: '2023-12-12'}}
            })
            expect(getByTestId('nav')).toBeDefined();

        })
        it('has not to render nav component only if user state does not exists', () => {
            const {queryByTestId} = renderWithUser({
                state: {user: null}
            })
            expect(queryByTestId('nav')).toBeNull();

        })
    })


    // Header
    describe('Header' , () => {
        it('has to render header component only if user state exists', () => {
            const {getByTestId} = renderWithUser({
                state: {user: {name: 'Nima', registerDate: '2023-12-12'}}
            })
            expect(getByTestId('header')).toBeDefined();

        })
        it('has not to render header component only if user state does not exists', () => {
            const {queryByTestId} = renderWithUser({
                state: {user: null}
            })
            expect(queryByTestId('header')).toBeNull();

        })
    })

    // Main
    describe('Main' , () => {
        it('has to render main component only if user state exists', () => {
            const {getByTestId} = renderWithUser({
                state: {user: {name: 'Nima', registerDate: '2023-12-12'}}
            })
            expect(getByTestId('main')).toBeDefined();

        })
        it('has not to render main component only if user state does not exists', () => {
            const {queryByTestId} = renderWithUser({
                state: {user: null}
            })
            expect(queryByTestId('main')).toBeNull();

        })
    })
})


/* Utils Function */
function renderWithUser(user) {
    return render(App, {store: {...store, ...user}})
}