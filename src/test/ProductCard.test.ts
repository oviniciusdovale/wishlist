import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  const product = {
    code: 'P001',
    name: 'Tênis Adidas Breaknet Feminino',
    image: 'https://via.placeholder.com/150',
    details: {
      description: 'Descrição do produto.',
    },
    fullPriceInCents: '39999',
    salePriceInCents: '30399',
    rating: 4.5,
  };

  it('should emit toggle-wishlist event when heart icon is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: { product, isWishlisted: false },
    });

    const wishlistIcon = wrapper.find('.wishlist-icon');
    expect(wishlistIcon.exists()).toBe(true);

    await wishlistIcon.trigger('click');

    const emittedEvents = wrapper.emitted('toggle-wishlist');
    expect(emittedEvents).toBeTruthy();
    if (emittedEvents) {
      expect(emittedEvents[0]).toEqual(['P001']);
    }
  });

  it('renders the product name', () => {
    const wrapper = mount(ProductCard, {
      props: { product, isWishlisted: false },
    });

    expect(wrapper.text()).toContain(product.name);
  });

  it('renders the product image with correct src and alt attributes', () => {
    const wrapper = mount(ProductCard, {
      props: { product, isWishlisted: false },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(product.image);
    expect(img.attributes('alt')).toBe(product.name);
  });

  it('renders the product pricing (full and sale price)', () => {
    const wrapper = mount(ProductCard, {
      props: { product, isWishlisted: false },
    });

    expect(wrapper.text()).toContain('R$ 399,99');
    expect(wrapper.text()).toContain('R$ 303,99');
  });

  it('should display the correct heart icon based on the wishlist state', async () => {
    let wrapper = mount(ProductCard, {
      props: { product, isWishlisted: false },
    });

    let heartOutlineIcon = wrapper.find('.heart-icon:not(.active)');
    let heartSolidIcon = wrapper.find('.heart-icon.active');
    expect(heartOutlineIcon.exists()).toBe(true);
    expect(heartSolidIcon.exists()).toBe(false);

    wrapper = mount(ProductCard, {
      props: { product, isWishlisted: true },
    });

    heartOutlineIcon = wrapper.find('.heart-icon:not(.active)');
    heartSolidIcon = wrapper.find('.heart-icon.active');
    expect(heartOutlineIcon.exists()).toBe(false);
    expect(heartSolidIcon.exists()).toBe(true);
  });
});
