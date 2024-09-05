<template>
  <div class="rating">
    <span v-for="n in 5" :key="n" :class="['star', getStarClass(n)]"> ★ </span>
    <span class="rating-total">{{ rating }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getStarClass(index: number) {
      if (index <= this.rating) {
        return 'filled';
      } else if (index - this.rating < 1) {
        return 'half';
      } else {
        return '';
      }
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
}

.star.filled {
  color: #ff9800;
}

.star.half::before {
  content: '★';
  position: absolute;
  color: #ff9800;
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
}

.rating-total {
  margin-left: 8px;
  font-size: 0.9em;
  color: #777;
}
</style>
