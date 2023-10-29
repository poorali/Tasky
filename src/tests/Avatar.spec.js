/* globals describe,it,expect */
import {render} from "@testing-library/vue";
import Avatar from "../components/Nav/Avatar/Avatar.vue";
import store from "../stores/store";

describe('Avatar.vue', () => {
    describe('State', () => {
        it('shows user name from state', () => {
            const {getByText} = renderWithUser({
                name: 'Nima Poorali Chokosari',
                registerDate: '2023-12-12'
            })

            expect(getByText('Nima Poorali Chokosari')).toBeDefined();
        })

        it('show user registered date from state', () => {
            const {getByText} = renderWithUser({
                name: 'Nima Poorali Chokosari',
                registerDate: '2023-12-12'
            })

            expect(getByText('2023-12-12')).toBeDefined();
        })

        it('shows first first two letter of user name as an avatar image', () => {
            const {queryByText} = renderWithUser({
                name: 'Nima Poorali Chokosari',
                registerDate: '2023-12-12'
            })

            expect(queryByText('NP')).toBeDefined();
            expect(queryByText('NPC')).toBeNull()
        })
        it('shows only first letter as an avatar image, if user only enters nick name', () => {
            const {getByText} = renderWithUser({
                name: 'Nima',
                registerDate: '2023-12-12'
            })
            expect(getByText('N')).toBeDefined();
        })
    })
})


function renderWithUser(user) {
    return render(Avatar, {
        store: {...store, ...{state: {user: user}}}
    })
}