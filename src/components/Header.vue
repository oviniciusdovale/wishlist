<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="/logo.svg" alt="Logo Netshoes" class="logo-image" />
      </router-link>

      <div class="nav-actions">
        <router-link to="/wishlist" class="wishlist-link">
          <span>Wishlist</span>
          <HeartIconOutline class="icon" />
        </router-link>

        <div class="user-menu">
          <div class="user-avatar" @click="toggleDropdown">
            <UserIcon class="icon" />
          </div>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <ul>
              <li>Entrar</li>
              <li>Minha Conta</li>
              <li>Endereços</li>
              <li>Minha Netshoes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline';
import { UserIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'Header',
  components: {
    HeartIconOutline,
    UserIcon,
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #8200ff;
  color: white;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.logo-image {
  height: 40px;
  width: 70%;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.wishlist-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-right: 24px;

  span {
    margin-right: 8px;
  }
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.user-menu {
  position: relative;
}

.user-avatar {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-menu {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 10;
  min-width: 150px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 8px 16px;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.dropdown-menu a {
  color: black;
  text-decoration: none;
}
</style>
