/* globals describe,it,expect */
import Header from "../components/Header/Header.vue";
import {render, within} from "@testing-library/vue";
import store from "../stores/store";

describe('Header.vue', () => {
    describe('UI', () => {
        it('has a heading', () => {
            const {getByTestId} = render(Header,{store})
            expect(getByTestId('welcome-message')).toBeDefined();
        })
        it('has a search component', () => {
            const {getByTestId} = render(Header,{store})
            expect(getByTestId('search')).toBeDefined();
        })
        it('shows avatar component in mobile size', () => {
            window.innerWidth = 320;
            const {getByTestId} = render(Header,{store})
            expect(getByTestId('avatar').style.display).not.toEqual('none');
            window.innerWidth = 1024
        })
        it('hides avatar component in desktop size', () => {
            const {queryByTestId} = render(Header,{store})
            expect(queryByTestId('avatar').style.display).toEqual('');
        })
    });
    describe('State', () => {
        it('shows user name in heading', () => {
            const {getByTestId}  = renderWithUser({
                name: 'Nima',
                registerDate: '2023-12-12'
            })
            expect(within(getByTestId('welcome-message')).getByText('Welcome Nima')).toBeTruthy()
        })
        it('shows only nick name in heading', () => {
            const {getByTestId}  = renderWithUser({
                name: 'Nima Poorali',
                registerDate: '2023-12-12'
            })
            expect(within(getByTestId('welcome-message')).getByText('Welcome Nima')).toBeTruthy()
        })
    })
})

//Utils
function renderWithUser(user) {
    store.state.user = user;
    return render(Header,{
        store
    })
}