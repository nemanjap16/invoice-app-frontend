<template>
  <div class="flex flex-col items-center pt-[104px] md:pt-[72px]">
    <div
      class="mb-[65px] flex w-[330px] items-baseline justify-between md:w-[550px] lg:w-[730px]"
    >
      <div class="flex flex-col gap-2">
        <h1
          class="text-2xl font-semibold text-title-color dark:text-white lg:text-3xl"
        >
          Invoices
        </h1>
        <!-- desktop -->
        <p
          class="hidden text-xs text-muted-color dark:text-muted-color-dark md:block"
        >
          There are {{ store.filteredInvoices.length }} invoices,
          <span v-if="store.paidInvoices.length > 0"
            >{{ store.paidInvoices.length }} paid,
          </span>
          <span v-if="store.pendingInvoices.length > 0"
            >{{ store.pendingInvoices.length }} pending,
          </span>
          <span v-if="store.draftInvoices.length > 0"
            >{{ store.draftInvoices.length }} draft.
          </span>
        </p>
        <!-- mobile -->
        <p class="text-muted-color dark:text-muted-color-dark md:hidden">
          {{ store.invoices.length }} invoices
        </p>
      </div>
      <div class="relative flex items-center gap-4 md:gap-16">
        <!-- filter card -->
        <div
          v-if="store.filterOpen"
          class="absolute top-20 right-0 flex w-[250px] flex-col gap-4 rounded-lg bg-white py-8 px-8 shadow-2xl dark:bg-nav-dark lg:left-0"
        >
          <label
            for="paid"
            class="flex w-max cursor-pointer items-center gap-3 text-sm font-bold dark:text-white"
            aria-label="Check paid invoices"
            @click="handleCheckbox"
          >
            <input
              class="checkbox custom-checkbox dark:bg-body-color-dark dark:checked:bg-purple-base"
              type="checkbox"
              name="paid"
              id="paid"
              value="paid"
            />
            Paid
          </label>
          <label
            for="pending"
            class="flex w-max cursor-pointer items-center gap-3 text-sm font-bold dark:text-white"
            aria-label="Check pending invoices"
            @click="handleCheckbox"
          >
            <input
              class="checkbox custom-checkbox dark:bg-body-color-dark dark:checked:bg-purple-base"
              type="checkbox"
              name="pending"
              id="pending"
              value="pending"
            />
            Pending
          </label>
          <label
            for="draft"
            class="flex w-max cursor-pointer items-center gap-3 text-sm font-bold dark:text-white"
            aria-label="Check draft invoices"
            @click="handleCheckbox"
          >
            <input
              class="checkbox custom-checkbox dark:bg-body-color-dark dark:checked:bg-purple-base"
              type="checkbox"
              name="draft"
              id="draft"
              value="draft"
            />
            Draft
          </label>
        </div>
        <button
          class="flex items-center gap-2 md:gap-4"
          aria-label="Filter invoices"
          @click="filter"
        >
          <p
            class="hidden font-semibold text-title-color dark:text-white md:block"
          >
            Filter by status
          </p>
          <p class="font-semibold text-title-color dark:text-white md:hidden">
            Filter
          </p>
          <IconArrowDown />
        </button>
        <button
          class="flex items-center gap-2 rounded-[60px] bg-purple-light p-2 text-white"
          @click="store.setEditModeFalse(), store.toggleForm()"
        >
          <div
            class="grid h-[32px] w-[32px] place-content-center rounded-full bg-white"
          >
            <IconPlus class="ml-[1px]" />
          </div>
          <span class="mr-2 hidden text-sm font-semibold md:block"
            >New Invoice</span
          >
          <span class="mr-2 font-semibold md:hidden">New</span>
        </button>
      </div>
    </div>
    <div
      v-for="invoice in store.filteredInvoices"
      v-if="store.invoices.length > 0"
    >
      <InvoiceData :invoice="invoice" :key="invoice.id" />
    </div>
    <div
      class="calc-height flex w-full flex-col items-center justify-center"
      v-if="store.invoices.length == 0"
    >
      <IconEmpty class="mx-auto" />
      <h2
        class="mb-6 mt-12 text-2xl font-bold text-title-color dark:text-white"
      >
        There is nothing here
      </h2>
      <p class="text-moon-color dark:text-white">
        Create a new invoice by clicking the
      </p>
      <p class="text-moon-color dark:text-white">
        <span class="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  </div>
</template>

<script setup>
import { useInvoiceStore } from "../stores/invoice";
import IconArrowDown from "./icons/IconArrowDown.vue";
import IconEmpty from "./icons/IconEmpty.vue";
import IconPlus from "./icons/IconPlus.vue";
import InvoiceData from "./InvoiceData.vue";

let store = useInvoiceStore();

const filter = (e) => {
  if (store.filterOpen) {
    e.currentTarget.children[2].style = "transform: rotate(0deg)";
    store.toggleFilter();
  } else {
    e.currentTarget.children[2].style = "transform: rotate(180deg)";
    store.toggleFilter();
  }
};

const handleCheckbox = () => {
  let checked = document.querySelectorAll(".checkbox:checked");
  let checkedCheckboxes = Array.from(checked).map((checkbox) => checkbox.value);
  if (checkedCheckboxes.length > 0) {
    store.setFilter(checkedCheckboxes);
  } else {
    store.setFilteredInvoices();
  }
  paidInvoices(checkedCheckboxes);
  pendingInvoices(checkedCheckboxes);
  draftInvoices(checkedCheckboxes);
};

const paidInvoices = (checkedCheckboxes) => {
  if (checkedCheckboxes.includes("paid")) {
    let paid = store.filteredInvoices.filter(
      (invoice) => invoice.status === "paid"
    );
    store.setPaidInvoices(paid);
  } else {
    store.setPaidInvoices(0);
  }
};

const pendingInvoices = (checkedCheckboxes) => {
  if (checkedCheckboxes.includes("pending")) {
    let pending = store.filteredInvoices.filter(
      (invoice) => invoice.status === "pending"
    );
    store.setPendingInvoices(pending);
  } else {
    store.setPendingInvoices(0);
  }
};

const draftInvoices = (checkedCheckboxes) => {
  if (checkedCheckboxes.includes("draft")) {
    let draft = store.filteredInvoices.filter(
      (invoice) => invoice.status === "draft"
    );
    store.setDraftInvoices(draft);
  } else {
    store.setDraftInvoices(0);
  }
};
</script>
