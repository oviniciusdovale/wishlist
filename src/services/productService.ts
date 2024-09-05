import axios from 'axios';

export async function fetchProducts() {
  try {
    const response = await axios.get(
      'https://wishlist-back.onrender.com/products',
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar produtos');
  }
}
