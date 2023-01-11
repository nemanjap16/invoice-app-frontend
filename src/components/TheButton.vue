<template>
  <div>
    <button
      type="button"
      class="btn text-[10px] font-semibold md:text-xs"
      :class="btnClass"
    >
      {{ name }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  btnClass: {
    type: String,
  },
});
</script>
