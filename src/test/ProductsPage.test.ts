import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProductsPage from '@/view/ProductsPage.vue';
import { fetchProducts } from '../services/productService';
import { getWishlist } from '../services/wishlistService';
import { useRoute } from 'vue-router';

function flushPromises() {
  return new Promise(setImmediate);
}

vi.mock('../services/productService', () => ({
  fetchProducts: vi.fn(),
}));

vi.mock('../services/wishlistService', () => ({
  getWishlist: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('ProductsPage.vue', () => {
  beforeEach(() => {
    vi.mocked(fetchProducts).mockResolvedValue([
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
    ]);

    vi.mocked(getWishlist).mockReturnValue(['P001']);

    vi.mocked(useRoute).mockReturnValue({
      name: 'ProductsPage',
      meta: {
        breadcrumb: 'Lista de Produtos',
      },
      matched: [],
      params: {},
      query: {},
      fullPath: '/products',
      hash: '',
    } as any);
  });

  it('should load products correctly', async () => {
    const wrapper = mount(ProductsPage);

    await flushPromises();

    const productCards = wrapper.findAllComponents({
      name: 'ProductCard',
    });
    expect(productCards).toHaveLength(2);
  });

  it('should load products and wishlist correctly', async () => {
    const wrapper = mount(ProductsPage);

    await flushPromises();

    const productCards = wrapper.findAllComponents({ name: 'ProductCard' });
    expect(productCards).toHaveLength(2);

    expect(getWishlist).toHaveBeenCalled();
    expect(wrapper.vm.wishlist).toEqual(['P001']);
  });
});
