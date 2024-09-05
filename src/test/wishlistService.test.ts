import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getWishlist,
  saveWishlist,
  toggleWishlist,
} from '../services/wishlistService';

describe('wishlistService', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'wishlist') {
        return JSON.stringify(['P001']);
      }
      return null;
    });

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should get wishlist from localStorage', () => {
    const wishlist = getWishlist();
    expect(localStorage.getItem).toHaveBeenCalledWith('wishlist');
    expect(wishlist).toEqual(['P001']);
  });

  it('should return an empty array if no wishlist is found in localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValueOnce(null);

    const wishlist = getWishlist();
    expect(wishlist).toEqual([]);
  });

  it('should save wishlist to localStorage', () => {
    const wishlist = ['P002', 'P003'];
    saveWishlist(wishlist);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify(wishlist),
    );
  });

  it('should add a product to the wishlist if it is not already there', () => {
    const initialWishlist = ['P001'];
    const updatedWishlist = toggleWishlist(initialWishlist, 'P002');

    expect(updatedWishlist).toEqual(['P001', 'P002']);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify(['P001', 'P002']),
    );
  });

  it('should remove a product from the wishlist if it is already there', () => {
    const initialWishlist = ['P001', 'P002'];
    const updatedWishlist = toggleWishlist(initialWishlist, 'P002');

    expect(updatedWishlist).toEqual(['P001']);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      JSON.stringify(['P001']),
    );
  });
});
