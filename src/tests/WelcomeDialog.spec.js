/* globals describe,it,expect */
import WelcomeDialog from "../components/WelcomeDialog/WelcomeDialog.vue";
import {fireEvent, render} from "@testing-library/vue";
import store from "../stores/store";

describe('WelcomeDialog.vue ', () => {
    describe('UI', () => {
        it('has a header for greeting and entering the name', () => {
            const {getByRole} = render(WelcomeDialog)
            expect(getByRole('heading')).toBeDefined();
        })
        it('has an input for name', () => {
            const {getByRole} = render(WelcomeDialog)
            expect(getByRole('input')).toBeDefined();
        })
        it('has a submit button', () => {
            const {getByRole} = render(WelcomeDialog)
            expect(getByRole('button')).toBeDefined();
        })
        it('should disable submit button until user enters the name', async() => {
            const {getByRole} = render(WelcomeDialog)
            const button = getByRole('button');
            const input = getByRole('input');

            expect(button.attributes().disabled).toBeDefined()
            await fireEvent.update(input,'Nima Poorali')
            expect(button.attributes().disabled).toBeUndefined()

            await fireEvent.update(input,'')
            expect(button.attributes().disabled).toBeDefined()
        })
    })
    describe('State', () => {
        it('should set user state after clicking on submit', async() => {
            const {getByRole} = render(WelcomeDialog,{
                store: store
            })
            const input = getByRole('input');
            const button = getByRole('button');
            await fireEvent.update(input, 'Nima Poorali')
            await fireEvent.click(button);
            expect(store.state.user.name).toEqual('Nima Poorali');
            expect(store.state.user.registerDate).toEqual(new Date().toDateString());
        })
    })
})