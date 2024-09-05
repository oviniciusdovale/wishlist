import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Wishlist from '@/view/Wishlist.vue';

describe('Wishlist.vue', () => {
  const mockLocalStorageData = JSON.stringify(['P001']);

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'wishlist') {
        return mockLocalStorageData;
      }
      return null;
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should load wishlist products from localStorage and display them', async () => {
    const wrapper = mount(Wishlist, {
      data() {
        return {
          products: [
            {
              code: 'P001',
              name: 'Produto 1',
              fullPriceInCents: '10000',
              salePriceInCents: '9000',
              rating: 4,
              image: '',
            },
            {
              code: 'P002',
              name: 'Produto 2',
              fullPriceInCents: '15000',
              salePriceInCents: '13000',
              rating: 3.5,
              image: '',
            },
          ],
        };
      },
    });

    await flushPromises();

    const productCards = wrapper.findAllComponents({ name: 'ProductCard' });
    expect(productCards).toHaveLength(1);
    expect(productCards[0].props('product').code).toBe('P001');
  });
});
