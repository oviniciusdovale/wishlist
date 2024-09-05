import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Wishlist from '@/view/Wishlist.vue';
import { fetchProducts } from '../services/productService';
import { getWishlist } from '../services/wishlistService';
import { useRoute } from 'vue-router';

function flushPromises() {
  return new Promise(setImmediate);
}

vi.mock('@/services/productService', () => ({
  fetchProducts: vi.fn(),
}));

vi.mock('@/services/wishlistService', () => ({
  getWishlist: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('Wishlist.vue', () => {
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

    vi.mocked(getWishlist).mockReturnValue(['P001']);
  });

  it('should load wishlist products correctly', async () => {
    const wrapper = mount(Wishlist);

    await flushPromises();

    const productCards = wrapper.findAllComponents({
      name: 'ProductCard',
    });
    expect(productCards).toHaveLength(1);
  });

  it('should display an empty message when wishlist is empty', async () => {
    vi.mocked(getWishlist).mockReturnValue([]);

    const wrapper = mount(Wishlist);

    await flushPromises();

    expect(wrapper.text()).toContain('Sua wishlist está vazia.');
  });

  it('should handle product fetch errors', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(
      new Error('Erro ao carregar produtos'),
    );

    const wrapper = mount(Wishlist);

    await flushPromises();

    expect(wrapper.text()).toContain(
      'Erro ao carregar produtos. Tente novamente mais tarde.',
    );
  });
});
