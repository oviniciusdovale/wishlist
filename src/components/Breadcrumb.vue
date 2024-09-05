<template>
  <nav class="breadcrumb">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="current !== 'Home'">
        <span class="separator">/</span>
        <strong>{{ current }}</strong>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();

    const current = computed(() => {
      return route.meta.breadcrumb || route.name || 'Home';
    });

    return {
      current,
    };
  },
});
</script>

<style scoped>
.breadcrumb {
  font-size: 0.9rem;
  color: #8200ff;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}

.breadcrumb ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb li {
  margin-right: 8px;
}

.breadcrumb strong {
  margin-left: 8px;
}

.breadcrumb a {
  color: #4a4a4a;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}
</style>
