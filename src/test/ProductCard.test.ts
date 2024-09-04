import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  it('should mount the component', () => {
    const wrapper = mount(ProductCard);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the product name', () => {
    const product = {
      name: 'Tênis Adidas Breaknet Feminino',
      image: 'https://via.placeholder.com/150',
      details: {
        description: 'Descrição do produto.',
      },
      fullPriceInCents: '39999',
      salePriceInCents: '30399',
      rating: 4.5,
    };

    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.text()).toContain(product.name);
  });

  it('renders the product image with correct src and alt attributes', () => {
    const product = {
      name: 'Tênis Adidas Breaknet Feminino',
      image: 'https://via.placeholder.com/150',
      details: {
        description: 'Descrição do produto.',
      },
      fullPriceInCents: '39999',
      salePriceInCents: '30399',
      rating: 4.5,
    };

    const wrapper = mount(ProductCard, {
      props: { product },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(product.image);
    expect(img.attributes('alt')).toBe(product.name);
  });

  it('renders the product pricing (full and sale price)', () => {
    const product = {
      name: 'Tênis Adidas Breaknet Feminino',
      image: 'https://via.placeholder.com/150',
      details: {
        description: 'Descrição do produto.',
      },
      fullPriceInCents: '39999',
      salePriceInCents: '30399',
      rating: 4.5,
    };

    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.text()).toContain('R$ 399,99');
    expect(wrapper.text()).toContain('R$ 303,99');
  });

  it('should toggle the wishlist state when heart icon is clicked', async () => {
    const product = {
      id: 1,
      name: 'Tênis Adidas Breaknet Feminino',
      image: 'https://via.placeholder.com/150',
      fullPriceInCents: '39999',
      salePriceInCents: '29999',
      rating: 4.5,
    };

    const wrapper = mount(ProductCard, {
      props: { product },
    });

    let heartIcon = wrapper.find('.heart-icon');
    expect(heartIcon.exists()).toBe(true);
    expect(heartIcon.classes()).not.toContain('active');

    await wrapper.find('.wishlist-icon').trigger('click');

    heartIcon = wrapper.find('.heart-icon');
    expect(heartIcon.exists()).toBe(true);
    expect(heartIcon.classes()).toContain('active');

    await wrapper.find('.wishlist-icon').trigger('click');

    heartIcon = wrapper.find('.heart-icon');
    expect(heartIcon.exists()).toBe(true);
    expect(heartIcon.classes()).not.toContain('active');
  });
});
