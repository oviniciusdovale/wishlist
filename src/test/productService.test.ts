import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchProducts } from '../services/productService';

// Mocking axios
vi.mock('axios');

describe('productService', () => {
  it('should fetch products successfully', async () => {
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

    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    const products = await fetchProducts();

    expect(products).toEqual(mockProducts);
    expect(axios.get).toHaveBeenCalledWith(
      'https://wishlist-back.onrender.com/products',
    );
  });

  it('should throw an error if the request fails', async () => {
    vi.mocked(axios.get).mockRejectedValue(
      new Error('Erro ao carregar produtos'),
    );

    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('Erro ao carregar produtos'));
    }

    expect(axios.get).toHaveBeenCalledWith(
      'https://wishlist-back.onrender.com/products',
    );
  });
});
