import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProductList from '@/components/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';
import mockProducts from '../data/productsMock.json';

describe('ProductList.vue', () => {
  it('renders a list of products from JSON data and passes them to ProductCard', () => {
    const products = mockProducts.products;

    const wrapper = mount(ProductList, {
      props: { products },
    });

    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards.length).toBe(products.length);

    productCards.forEach((card, index) => {
      expect(card.props().product).toEqual(products[index]);
    });
  });
});
