<template>
  <div class="skeleton-product">
    <div class="skeleton-image"></div>
    <div class="skeleton-info">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-price"></div>
      <div class="skeleton-line skeleton-rating"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
.skeleton-product {
  width: calc(25% - 16px);
  padding: 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
}

.skeleton-info {
  width: 100%;
}

.skeleton-line {
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-title {
  width: 80%;
}

.skeleton-price {
  width: 60%;
}

.skeleton-rating {
  width: 40%;
}

@media (max-width: 768px) {
  .skeleton-product {
    flex: 0 0 calc(50% - 16px);
  }
}

@media (max-width: 640px) {
  .skeleton-product {
    flex: 0 0 100%;
  }
}
</style>
