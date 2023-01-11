<template>
  <div
    class="absolute inset-0 z-20 grid place-content-center bg-[#0d0f1780] p-8"
  >
    <div
      class="flex max-w-[480px] flex-col gap-4 rounded-lg bg-white p-6 dark:bg-title-color"
    >
      <h1 class="text-xl font-bold text-title-color dark:text-white">
        Confirm Deletion
      </h1>
      <p class="text-sm text-moon-color dark:text-white">
        Are you sure to want delete invoice #<span>{{ props.id }}</span
        >? This action cannot be undone.
      </p>
      <div class="ml-auto flex gap-4">
        <TheButton
          aria-label="Cancel deletion"
          name="Cancel"
          btnClass="cancel"
          @click="store.toggleModal()"
        />
        <TheButton
          aria-label="Delete invoice"
          name="Delete"
          btnClass="delete"
          @click="
            store.deleteInvoice(props.id), router.back(), store.toggleModal()
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheButton from "./TheButton.vue";
import { useInvoiceStore } from "../stores/invoice";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
  },
});

const store = useInvoiceStore();
const router = useRouter();
</script>
