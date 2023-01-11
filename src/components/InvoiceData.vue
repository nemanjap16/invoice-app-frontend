<template>
  <!-- desktop -->
  <router-link
    :to="{
      name: 'invoice',
      params: { id: invoice.id },
    }"
    @click="store.getInvoice(invoice.id)"
  >
    <div class="hidden shadow-md lg:block">
      <div
        class="mb-3 flex w-[730px] items-center justify-between rounded-md border-2 border-solid border-transparent bg-white p-4 hover:border-purple-light dark:bg-nav-dark"
      >
        <div class="flex items-center gap-5">
          <div class="flex items-center">
            <span class="text-moon-color">#</span>
            <p
              class="max-w-[80px] truncate font-bold text-title-color dark:text-white"
            >
              {{ invoice.id }}
            </p>
          </div>
          <p class="text-sm text-moon-color">Due {{ date }}</p>
          <h3 class="text-moon-color dark:text-moon-hover">
            {{ invoice.clientName }}
          </h3>
        </div>
        <div class="flex items-center gap-5">
          <p class="text-base font-bold text-title-color dark:text-white">
            {{ number }}
          </p>
          <StatusBtn :invoice="invoice" />
          <IconArrowRight />
        </div>
      </div>
    </div>
  </router-link>
  <!-- mobile -->
  <router-link
    :to="{ name: 'invoice', params: { id: invoice.id } }"
    @click="store.getInvoice(invoice.id)"
  >
    <div class="container lg:hidden">
      <div
        class="mb-3 flex w-[330px] flex-col gap-5 rounded-md border-2 border-solid border-transparent bg-white p-5 hover:border-purple-light dark:bg-nav-dark"
      >
        <div class="flex justify-between">
          <div class="flex">
            <span class="text-moon-color">#</span>
            <p
              class="max-w-[120px] truncate text-sm font-bold text-title-color dark:text-white"
            >
              {{ invoice.id }}
            </p>
          </div>
          <h3 class="text-sm text-moon-color dark:text-moon-hover">
            {{ invoice.clientName }}
          </h3>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <p class="mb-2 text-sm text-moon-color">Due {{ date }}</p>
            <p class="text-sm font-bold text-title-color dark:text-white">
              {{ number }}
            </p>
          </div>
          <StatusBtn :invoice="invoice" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import IconArrowRight from "./icons/IconArrowRight.vue";
import { formatDate } from "../utilities/FormatDate";
import { formatCurrency } from "../utilities/formatNumber";
import { useInvoiceStore } from "../stores/invoice";
import StatusBtn from "./StatusBtn.vue";

const date = ref(formatDate(props.invoice.paymentDue));
const number = ref(formatCurrency(props.invoice.total));
const store = useInvoiceStore();

const props = defineProps({
  invoice: {
    type: Object,
  },
});

let status = ref(props.invoice.status);

const statusColor = () => {
  switch (status.value) {
    case "paid":
      return "green-text";
    case "pending":
      return "orange-text";
    case "draft":
      return "gray-text";
    default:
      return "orange-text";
  }
};

const statusColorDot = () => {
  switch (status.value) {
    case "paid":
      return "dot-paid";
    case "pending":
      return "dot-pending";
    case "draft":
      return "dot-draft";
    default:
      return "dot-pending";
  }
};

const statusColorBg = () => {
  switch (status.value) {
    case "paid":
      return "paid-bg";
    case "pending":
      return "pending-bg";
    case "draft":
      return "draft-bg";
    default:
      return "pending-bg";
  }
};
</script>
