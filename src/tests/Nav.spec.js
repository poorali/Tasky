/* globals describe, expect, it */
import {render} from "@testing-library/vue";
import Nav from "../components/Nav/Nav.vue";
import store from "../stores/store";

describe('Nav.vue', () => {
    describe('UI', () => {
        it('hides in mobile devices', () => {
            window.innerWidth = 320;
            const {getByTestId} = render(Nav, {store})
            expect(getByTestId('nav').style.display).toEqual('');
            window.innerWidth = 1024;
        })
        it('shows in desktop devices', () => {
            const {getByTestId} = render(Nav, {store})
            expect(getByTestId('nav').style.display).toBeDefined();
        })
        it('has the avatar component in it', () => {
            const {getByTestId} = render(Nav, {store});
            expect(getByTestId('avatar')).toBeDefined();
        })
        it('has the filter component in it', () => {
            const {getByTestId} = render(Nav, {store});
            expect(getByTestId('filter')).toBeDefined();
        })
    })
})