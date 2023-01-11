<template>
  <div
    class="flex w-[110px] items-center justify-center gap-2 rounded-md py-2 px-4"
    :class="statusColorBg()"
  >
    <span class="h-2 w-2 rounded-full" :class="statusColorDot()"></span>
    <p class="text-sm font-semibold capitalize" :class="statusColor()">
      {{ invoice.status }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  invoice: {
    type: Object,
  },
});

const statusColor = () => {
  switch (props.invoice.status) {
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
  switch (props.invoice.status) {
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
  switch (props.invoice.status) {
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
