/* globals describe, expect, it */
import {render} from "@testing-library/vue";
import Nav from "../components/Nav/Nav.vue";

describe('Nav.vue', () => {
    describe('UI', () => {
        it('hides in mobile devices', () => {
            window.innerWidth = 320;
            const {getByTestId} = render(Nav)
            expect(getByTestId('nav').style.display).toEqual('none');
            window.innerWidth = 1024;
        })
        it('shows in desktop devices', () => {
            const {getByTestId} = render(Nav)
            expect(getByTestId('nav').style.display).not.toEqual('none');
        })
        it('has the avatar component in it', () => {
            const {getByTestId} = render(Nav);
            expect(getByTestId('avatar')).toBeDefined();
        })
        it('has the filter component in it', () => {
            const {getByTestId} = render(Nav);
            expect(getByTestId('filter')).toBeDefined();
        })
    })
})