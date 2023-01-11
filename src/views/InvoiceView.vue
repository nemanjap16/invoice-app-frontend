<template>
  <!-- desktop view -->
  <div class="flex">
    <TheNavbar />
    <div class="hidden w-full md:block">
      <div class="mx-auto mt-[64px] flex w-[730px] flex-col">
        <button
          class="mb-[32px] flex items-center gap-6"
          @click="
            router.back();
            store.setFilteredInvoices();
          "
          aria-label="Go back"
        >
          <span><ArrowLeft /></span>
          <p
            class="text-sm font-bold hover:text-purple-base dark:text-white dark:hover:text-moon-color"
          >
            Go back
          </p>
        </button>
        <div
          class="mb-[24px] flex items-center justify-between rounded-lg bg-white px-[32px] py-[24px] dark:bg-nav-dark"
        >
          <div class="flex items-center gap-5">
            <span class="text-xs text-moon-color dark:text-white">Status</span>
            <StatusBtn :invoice="store.currentInvoice" />
          </div>
          <div class="flex gap-2">
            <TheButton
              name="Edit"
              btnClass="edit"
              @click="store.toggleForm(), store.setEditModeTrue()"
            />
            <TheButton
              name="Delete"
              btnClass="delete"
              @click="store.toggleModal()"
            />
            <TheButton
              v-if="store.currentInvoice.status !== 'paid'"
              name="Mark as Paid"
              btnClass="paid"
              @click="store.markAsPaid(store.currentInvoice.id)"
            />
          </div>
        </div>
        <div
          class="min-h-[630px] w-[730px] rounded-lg bg-white p-[48px] dark:bg-nav-dark"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <p class="font-bold dark:text-white">
                <span class="text-moon-color dark:text-muted-color">#</span
                >{{ store.currentInvoice.id }}
              </p>
              <p class="text-xs text-moon-color dark:text-white">
                {{ store.currentInvoice.description }}
              </p>
            </div>
            <div
              class="mb-[22px] flex flex-col gap-1 text-right text-xs text-moon-color dark:text-white"
            >
              <p>{{ store.currentInvoice.senderAddress?.street }}</p>
              <p>{{ store.currentInvoice.senderAddress?.city }}</p>
              <p>{{ store.currentInvoice.senderAddress?.postCode }}</p>
              <p>{{ store.currentInvoice.senderAddress?.country }}</p>
            </div>
          </div>
          <div class="flex dark:text-white">
            <div class="flex w-1/3 flex-col justify-between">
              <div class="flex flex-col gap-2">
                <p class="text-sm text-moon-color dark:text-white">
                  Invoice Date
                </p>
                <p class="text-base font-bold">
                  {{ formatDate(store.currentInvoice.createdAt) }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-sm text-moon-color dark:text-white">
                  Payment Due
                </p>
                <p class="text-base font-bold">
                  {{ formatDate(store.currentInvoice.paymentDue) }}
                </p>
              </div>
            </div>
            <div class="flex w-full justify-evenly">
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-2">
                  <p class="text-sm text-moon-color dark:text-white">Bill To</p>
                  <p class="text-base font-bold">
                    {{ store.currentInvoice.clientName }}
                  </p>
                </div>
                <div
                  class="flex flex-col gap-1 text-left text-xs text-moon-color dark:text-white"
                >
                  <p>{{ store.currentInvoice.clientAddress?.street }}</p>
                  <p>{{ store.currentInvoice.clientAddress?.city }}</p>
                  <p>{{ store.currentInvoice.clientAddress?.postCode }}</p>
                  <p>{{ store.currentInvoice.clientAddress?.country }}</p>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-sm text-moon-color dark:text-white">Sent To</p>
                <p class="text-base font-bold">
                  {{ store.currentInvoice.clientEmail }}
                </p>
              </div>
            </div>
          </div>
          <!-- invoice details & total -->
          <div
            class="flex flex-col overflow-hidden text-moon-color dark:text-white"
          >
            <div
              class="mt-[50px] flex min-h-[185px] flex-col gap-[32px] rounded-t-xl bg-light-gray p-[32px] dark:bg-body-color-dark"
            >
              <div class="flex justify-between">
                <p class="w-1/3 text-xs">Item name</p>
                <div class="grid w-2/3 grid-cols-3 text-right">
                  <p class="text-xs">QTY.</p>
                  <p class="text-xs">Price</p>
                  <p class="text-xs">Total</p>
                </div>
              </div>
              <!-- items loop  -->
              <div
                v-for="(item, index) in store.currentInvoice.items"
                :key="index"
              >
                <div class="flex justify-between font-bold">
                  <p class="w-1/3 text-xs text-black dark:text-white">
                    {{ item.name }}
                  </p>
                  <div class="grid w-2/3 grid-cols-3 text-right">
                    <p class="mr-4 text-xs">{{ item.quantity }}</p>
                    <p class="text-xs">{{ formatCurrency(item.price) }}</p>
                    <p class="text-xs text-black dark:text-white">
                      {{ formatCurrency(item.total) }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- loop end -->
            </div>
            <div
              class="color flex min-h-[50px] items-center justify-between rounded-b-xl bg-title-color p-[32px] dark:bg-black"
            >
              <p class="text-xs text-white">Grand Total</p>
              <p class="text-xl font-bold text-white">
                {{ formatCurrency(store.currentInvoice.total) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- mobile view -->
  <div class="mt-[132px] w-full md:hidden">
    <div class="px-4">
      <button
        class="mb-[32px] flex items-center gap-6"
        @click="
          router.back();
          store.setFilteredInvoices();
        "
        aria-label="Go back"
      >
        <span><ArrowLeft /></span>
        <p
          class="text-sm font-bold hover:text-purple-base dark:text-white dark:hover:text-moon-color"
        >
          Go back
        </p>
      </button>
      <div
        class="mb-[24px] flex items-center justify-between rounded-lg bg-white px-[32px] py-[24px] dark:bg-nav-dark"
      >
        <span class="text-xs text-moon-color dark:text-white">Status</span>
        <StatusBtn :invoice="store.currentInvoice" />
      </div>
      <div
        class="flex flex-col gap-[30px] rounded-lg bg-white p-[24px] dark:bg-nav-dark dark:text-white"
      >
        <div class="flex flex-col gap-1">
          <p class="text-xs font-bold">
            <span class="text-moon-color dark:text-white">#</span
            >{{ store.currentInvoice.id }}
          </p>
          <p class="text-xs text-moon-color dark:text-white">
            {{ store.currentInvoice.description }}
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-moon-color dark:text-white">
            {{ store.currentInvoice.senderAddress?.street }}
          </p>
          <p class="text-xs text-moon-color dark:text-white">
            {{ store.currentInvoice.senderAddress?.city }}
          </p>
          <p class="text-xs text-moon-color dark:text-white">
            {{ store.currentInvoice.senderAddress?.postCode }}
          </p>
          <p class="text-xs text-moon-color dark:text-white">
            {{ store.currentInvoice.senderAddress?.country }}
          </p>
        </div>
        <div class="flex gap-10">
          <div class="flex flex-col justify-between">
            <div class="flex flex-col gap-2">
              <p class="text-xs text-moon-color dark:text-white">
                Invoice Date
              </p>
              <p class="text-xs font-bold">
                {{ formatDate(store.currentInvoice.createdAt) }}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xs text-moon-color dark:text-white">Payment Due</p>
              <p class="text-xs font-bold">
                {{ formatDate(store.currentInvoice.paymentDue) }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <p class="text-xs text-moon-color dark:text-white">Bill To</p>
              <p class="text-xs font-bold">
                {{ store.currentInvoice.clientName }}
              </p>
            </div>
            <div
              class="flex flex-col gap-1 text-xs text-moon-color dark:text-white"
            >
              <p>{{ store.currentInvoice.clientAddress?.street }}</p>
              <p>{{ store.currentInvoice.clientAddress?.city }}</p>
              <p>{{ store.currentInvoice.clientAddress?.postCode }}</p>
              <p>{{ store.currentInvoice.clientAddress?.country }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xs text-moon-color dark:text-white">Sent To</p>
          <p class="text-xs font-bold">
            {{ store.currentInvoice.clientEmail }}
          </p>
        </div>
        <div
          class="overflow-hidden rounded-lg bg-light-gray dark:bg-body-color-dark"
        >
          <div
            v-for="(item, index) in store.currentInvoice.items"
            :key="index"
            class="px-[24px]"
          >
            <div class="flex justify-between pt-[24px]">
              <div class="flex flex-col gap-1">
                <p class="text-xs font-bold">{{ item.name }}</p>
                <p class="text-xs font-semibold text-moon-color">
                  {{ item.quantity }} x {{ formatCurrency(item.price) }}
                </p>
              </div>
              <div>
                <p class="text-xs font-bold">
                  {{ formatCurrency(item.total) }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="mt-[24px] flex items-center justify-between bg-title-color p-[24px] text-white dark:bg-black"
          >
            <p class="text-xs">Grand Total</p>
            <p class="text-sm font-bold">
              {{ formatCurrency(store.currentInvoice.total) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-[56px] flex h-[90px] items-center justify-center gap-3 bg-white dark:bg-nav-dark"
    >
      <TheButton
        name="Edit"
        btnClass="edit"
        @click="store.toggleForm(), store.setEditModeTrue()"
      />
      <TheButton name="Delete" btnClass="delete" @click="store.toggleModal()" />
      <TheButton
        v-if="store.currentInvoice.status !== 'paid'"
        name="Mark as Paid"
        btnClass="paid"
        @click="store.markAsPaid(store.currentInvoice.id)"
      />
    </div>
  </div>
  <TheModal v-if="store.modalOpen" :id="store.currentInvoice.id" />
  <transition name="form">
    <TheForm v-if="store.formOpen" />
  </transition>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ArrowLeft from "../components/icons/ArrowLeft.vue";
import StatusBtn from "../components/StatusBtn.vue";
import TheButton from "../components/TheButton.vue";
import TheForm from "../components/TheForm.vue";
import TheModal from "../components/TheModal.vue";
import TheNavbar from "../components/TheNavbar.vue";
import { useInvoiceStore } from "../stores/invoice";
import { formatDate } from "../utilities/FormatDate";
import { formatCurrency } from "../utilities/formatNumber";

let router = useRouter();
let route = useRoute();
const store = useInvoiceStore();

onMounted(() => {
  document.title = `Invoice Details | ${route.params.id}`;
  // let invoice = store.filteredInvoices.find(
  //   (inv) => inv.id === route.params.id
  // );
  // document.title = `Invoice Details | ${invoice.clientName}`;
});
</script>
