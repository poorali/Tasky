/* globals describe,it,expect */
import Header from "../components/Header/Header.vue";
import {render, within} from "@testing-library/vue";
import store from "../stores/store";

describe('Header.vue', () => {
    describe('UI', () => {
        it('has a heading', () => {
            const {getByRole} = render(Header)
            expect(getByRole('heading')).toBeDefined();
        })
        it('has a search component', () => {
            const {getByTestId} = render(Header)
            expect(getByTestId('search')).toBeDefined();
        })
        it('shows avatar component in mobile size', () => {
            window.innerWidth = 320;
            const {getByTestId} = render(Header)
            expect(getByTestId('avatar').style.display).not.toEqual('none');
            window.innerWidth = 1024
        })
        it('hides avatar component in desktop size', () => {
            const {queryByTestId} = render(Header)
            expect(queryByTestId('avatar').style.display).toEqual('none');
        })
    });
    describe('State', () => {
        it('shows user name in heading', () => {
            const {getByRole}  = renderWithUser({
                name: 'Nima',
                registerDate: '2023-12-12'
            })
            expect(within(getByRole('heading')).getByText('Welcome Nima')).toBeTruthy()
        })
        it('shows only nick name in heading', () => {
            const {getByRole}  = renderWithUser({
                name: 'Nima Poorali',
                registerDate: '2023-12-12'
            })
            expect(within(getByRole('heading')).getByText('Welcome Nima')).toBeTruthy()
        })
    })
})

//Utils
function renderWithUser(user) {
    return render(Header,{
        store: {...store,...{state:{user: user}}}
    })
}