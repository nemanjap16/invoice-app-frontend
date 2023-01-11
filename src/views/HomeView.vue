<script setup>
import TheForm from "../components/TheForm.vue";
import TheInvoices from "../components/TheInvoices.vue";
import TheNavbar from "../components/TheNavbar.vue";
import { useInvoiceStore } from "@/stores/invoice";

const store = useInvoiceStore();
</script>

<template>
  <div>
    <header>
      <TheNavbar />
    </header>
    <main>
      <TheInvoices />
    </main>
    <transition name="form">
      <TheForm v-if="store.formOpen" />
    </transition>
  </div>
</template>

<style>
.form-enter-active,
.form-leave-active {
  transition: all 0.8s ease-in-out;
}
.form-enter-from,
.form-leave-to {
  transform: translateX(-750px);
}
</style>
