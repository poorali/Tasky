/* globals describe, it, expect*/
import {fireEvent, render} from "@testing-library/vue";
import Search from "../components/Header/Search/Search.vue";
import store from "../stores/store";

describe('UI', () => {
    it('has a search input', () => {
        const {getByTestId} = render(Search, {store})
        expect(getByTestId('search-input')).toBeDefined();
    })
    it('should has default empty value', () => {
        const {getByTestId} = render(Search, {store})
        expect(getByTestId('search-input').value).toEqual('');
    });
})
describe('State', function () {
    it('should update search query on input change', async () => {
        const {getByTestId} = render(Search, {store})
        const search = getByTestId('search-input');
        await fireEvent.update(search, 'Sea')
        expect(store.state.searchQuery).toEqual('Sea');
    });
});