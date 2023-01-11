<template>
  <div
    class="nav absolute left-0 flex h-full flex-col justify-between overflow-hidden rounded-tr-3xl rounded-br-3xl bg-nav-base dark:bg-nav-dark"
  >
    <div
      class="box-1 flex h-[103px] w-[103px] items-center justify-center bg-purple-base"
    >
      <img
        class="logo z-10"
        src="../assets/icons/logo.svg"
        alt="logo"
        width="45"
      />
    </div>
    <div class="user flex flex-col items-center">
      <button class="theme-btn h-[103px]" aria-label="Theme switch">
        <IconMoon
          v-if="moon"
          id="moon"
          class="text-moon-color hover:text-moon-hover"
          @click="toggleTheme"
        />
        <IconSun
          v-else
          id="sun"
          class="text-moon-color hover:text-moon-hover"
          ref="sunIcon"
          @click="toggleTheme"
        />
      </button>
      <figure
        class="avatar grid h-[103px] w-full place-content-center border-t-[1px] border-solid border-slate-500"
      >
        <img
          class="rounded-full"
          src="../assets/images/image-avatar.jpg"
          alt="avatar"
          width="46"
        />
      </figure>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";
import { themeCheck, themeSwitch } from "../themeSwitch";

let theme = localStorage.getItem("theme");

const moon = ref(false);
const sun = ref(false);

if (theme === null) {
  sun.value = false;
  moon.value = true;
}

if (theme === "dark") {
  sun.value = true;
  moon.value = false;
}

if (theme === "light") {
  sun.value = false;
  moon.value = true;
}

const toggleTheme = (event) => {
  if (event.currentTarget.id === "moon") {
    moon.value = false;
    sun.value = true;
    themeSwitch();
    return;
  }
  if (event.currentTarget.id === "sun") {
    sun.value = false;
    moon.value = true;
    themeSwitch();
    return;
  }
};
// check theme on initial load
themeCheck();
</script>

<style scoped>
.nav {
  z-index: 99;
  overflow: hidden;
}
@media (max-width: 768px) {
  .nav {
    flex-direction: row;
    border-radius: 0%;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.box-1 {
  position: relative;
  border-bottom-right-radius: 24px;
}

.box-1::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50%;
  background-color: #9277ff;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 24px;
}

@media (max-width: 768px) {
  .box-1 {
    height: 80px;
    width: 80px;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }

  .box-1::after {
    border-top-left-radius: 18px;
  }
  .user {
    flex-direction: row;
  }
  .avatar {
    width: 103px;
    border-top: 0;
    border-left: 1px solid rgb(100, 116, 139);
  }
  .theme-btn {
    width: 50px;
  }
  .logo {
    width: 28px;
  }
}
</style>
