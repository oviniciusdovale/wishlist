export function getWishlist(): string[] {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
}

export function saveWishlist(wishlist: string[]): void {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export function toggleWishlist(
  wishlist: string[],
  productCode: string,
): string[] {
  const index = wishlist.indexOf(productCode);
  if (index === -1) {
    wishlist.push(productCode);
  } else {
    wishlist.splice(index, 1);
  }
  saveWishlist(wishlist);
  return wishlist;
}
