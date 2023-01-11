<script setup>
import { RouterView } from "vue-router";
import { useInvoiceStore } from "./stores/invoice";
const store = useInvoiceStore();
store.getInvoices();
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
