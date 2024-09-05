import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProductsPage from '@/view/ProductsPage.vue';

describe('ProductsPage.vue', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'wishlist') {
        return JSON.stringify(['P001']);
      }
      return null;
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should load products correctly', () => {
    const products = [
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
    ];

    const wrapper = mount(ProductsPage, {
      data() {
        return {
          products,
        };
      },
    });

    const productCards = wrapper.findAllComponents({ name: 'ProductCard' });
    expect(productCards).toHaveLength(products.length);
  });

  it('should initialize wishlist from localStorage', () => {
    const wrapper = mount(ProductsPage);
    expect(localStorage.getItem).toHaveBeenCalledWith('wishlist');
    expect(wrapper.vm.wishlist).toEqual(['P001']);
  });

  it('should add product to wishlist and update localStorage', async () => {
    const wrapper = mount(ProductsPage, {
      data() {
        return {
          products: [
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

    await wrapper.vm.toggleWishlist('P002');

    expect(wrapper.vm.wishlist).toContain('P002');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify(['P001', 'P002']),
    );
  });

  it('should remove product from wishlist and update localStorage', async () => {
    const wrapper = mount(ProductsPage, {
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
          ],
        };
      },
    });

    await wrapper.vm.toggleWishlist('P001');

    expect(wrapper.vm.wishlist).not.toContain('P001');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify([]),
    );
  });
});
