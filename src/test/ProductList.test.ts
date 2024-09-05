import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProductList from '@/components/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductList.vue', () => {
  const mockProducts = [
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

  it('should render the correct number of products', () => {
    const wrapper = mount(ProductList, {
      props: {
        products: mockProducts,
        wishlist: ['P001'],
      },
    });

    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('should emit toggle-wishlist event when a product is added/removed from wishlist', async () => {
    const wrapper = mount(ProductList, {
      props: {
        products: mockProducts,
        wishlist: ['P001'],
      },
    });

    const productCard = wrapper
      .findAllComponents(ProductCard)
      .find((card) => card.props('product').code === 'P002');

    if (!productCard) {
      throw new Error('ProductCard for P002 not found');
    }

    const wishlistIcon = productCard.find('.wishlist-icon');
    await wishlistIcon.trigger('click');

    const emittedEvents = wrapper.emitted('toggle-wishlist');
    expect(emittedEvents).toBeTruthy();
    if (emittedEvents) {
      expect(emittedEvents[0]).toEqual(['P002']);
    }
  });
});
