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
              <li><router-link to="/login">Entrar</router-link></li>
              <li><router-link to="/account">Minha Conta</router-link></li>
              <li><router-link to="/addresses">Endereços</router-link></li>
              <li>
                <router-link to="/my-netshoes">Minha Netshoes</router-link>
              </li>
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
      console.log('Dropdown Open State:', this.dropdownOpen);
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #8200ff;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-image {
  height: 40px;
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
  top: 40px;
  right: 0;
  background-color: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 10;
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
