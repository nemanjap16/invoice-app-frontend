<template>
  <div
    v-if="store.formOpen"
    class="absolute inset-0 z-10 bg-[#0d0f1780] md:right-[-800px]"
  >
    <form
      class="flex h-full w-screen flex-col gap-[48px] overflow-y-scroll rounded-tr-2xl rounded-br-2xl bg-white p-[26px] pl-[26px] dark:bg-[#141625] md:w-[730px] md:p-[56px] md:pl-[159px]"
      @submit.prevent
    >
      <div class="dark:text-white">
        <h1 v-if="store.editMode" class="text-2xl font-bold">
          Edit <span class="text-moon-color">#</span>{{ invoice.id }}
        </h1>
        <h1 v-else class="text-2xl font-bold">New Invoice</h1>
      </div>
      <!-- Bill From -->
      <div class="flex flex-col gap-[24px]">
        <h3 class="text-sm font-bold text-purple-base">Bill From</h3>
        <div
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
        >
          <div class="flex justify-between">
            <label class="text-xs" for="address"> Street Address </label>
            <span class="text-[10px] text-red-500">{{
              errors.senderAddress
            }}</span>
          </div>
          <input
            class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
            :class="[errors.senderAddress ? 'invalidBorder' : 'validBorder']"
            type="text"
            name="street"
            id="address"
            v-model.trim.trim="invoice.senderAddress.street"
            @keyup="
              validateEmptyField('senderAddress', invoice.senderAddress.street)
            "
            @blur="
              validateEmptyField('senderAddress', invoice.senderAddress.street)
            "
          />
        </div>
        <div class="grid grid-cols-2 gap-[10px] gap-y-5 md:grid-cols-3">
          <div
            class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="city"> City </label>
              <span class="text-[10px] text-red-500">{{
                errors.senderCity
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.senderCity ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="city"
              id="city"
              v-model.trim="invoice.senderAddress.city"
              @keyup="
                validateEmptyField('senderCity', invoice.senderAddress.city)
              "
              @blur="
                validateEmptyField('senderCity', invoice.senderAddress.city)
              "
            />
          </div>
          <div
            class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="postCode"> Post Code </label>
              <span class="text-[10px] text-red-500">{{
                errors.senderPostCode
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.senderPostCode ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="postCode"
              id="postCode"
              v-model.trim="invoice.senderAddress.postCode"
              @keyup="
                validateEmptyField(
                  'senderPostCode',
                  invoice.senderAddress.postCode
                )
              "
              @blur="
                validateEmptyField(
                  'senderPostCode',
                  invoice.senderAddress.postCode
                )
              "
            />
          </div>
          <div
            class="col-span-2 flex flex-col gap-[10px] text-xs text-moon-color dark:text-white md:col-span-1"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="country"> Country </label>
              <span class="text-[10px] text-red-500">{{
                errors.senderCountry
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.senderCountry ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="country"
              id="country"
              v-model.trim="invoice.senderAddress.country"
              @keyup="
                validateEmptyField(
                  'senderCountry',
                  invoice.senderAddress.country
                )
              "
              @blur="
                validateEmptyField(
                  'senderCountry',
                  invoice.senderAddress.country
                )
              "
            />
          </div>
        </div>
      </div>
      <!-- Bill To -->
      <div class="flex flex-col gap-[24px]">
        <h3 class="text-sm font-bold text-purple-base">Bill To</h3>
        <div
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
        >
          <div class="flex justify-between">
            <label class="text-xs" for="clientName"> Client's Name </label>
            <span class="text-[10px] text-red-500">{{
              errors.clientName
            }}</span>
          </div>
          <input
            class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
            :class="[errors.clientName ? 'invalidBorder' : 'validBorder']"
            type="text"
            name="clientName"
            id="clientName"
            v-model.trim="invoice.clientName"
            @keyup="validateEmptyField('clientName', invoice.clientName)"
            @blur="validateEmptyField('clientName', invoice.clientName)"
          />
        </div>
        <div
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
        >
          <div class="flex justify-between">
            <label class="text-xs" for="clientEmail"> Client's Email </label>
            <span class="text-[10px] text-red-500">{{
              errors.clientEmail
            }}</span>
          </div>
          <input
            class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
            :class="[errors.clientEmail ? 'invalidBorder' : 'validBorder']"
            type="text"
            name="clientEmail"
            id="clientEmail"
            v-model.trim="invoice.clientEmail"
            @keyup="validateEmptyField('clientEmail', invoice.clientEmail)"
            @blur="validateEmptyField('clientEmail', invoice.clientEmail)"
          />
        </div>
        <div
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
        >
          <div class="flex justify-between">
            <label class="text-xs" for="clientEmail"> Street Address </label>
            <span class="text-[10px] text-red-500">{{
              errors.clientAddress
            }}</span>
          </div>
          <input
            class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
            :class="[errors.clientAddress ? 'invalidBorder' : 'validBorder']"
            type="text"
            name="clientAddress"
            id="clientAddress"
            v-model.trim="invoice.clientAddress.street"
            @keyup="
              validateEmptyField('clientAddress', invoice.clientAddress.street)
            "
            @blur="
              validateEmptyField('clientAddress', invoice.clientAddress.street)
            "
          />
        </div>
        <div class="grid grid-cols-2 gap-[10px] gap-y-5 md:grid-cols-3">
          <div
            class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="clientCity"> City </label>
              <span class="text-[10px] text-red-500">{{
                errors.clientCity
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.clientCity ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="clientCity"
              id="clientCity"
              v-model.trim="invoice.clientAddress.city"
              @keyup="
                validateEmptyField('clientCity', invoice.clientAddress.city)
              "
              @blur="
                validateEmptyField('clientCity', invoice.clientAddress.city)
              "
            />
          </div>
          <div
            class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="clientPostCode"> Post Code </label>
              <span class="text-[10px] text-red-500">{{
                errors.clientPostCode
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.clientPostCode ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="clientPostCode"
              id="clientPostCode"
              v-model.trim="invoice.clientAddress.postCode"
              @keyup="
                validateEmptyField(
                  'clientPostCode',
                  invoice.clientAddress.postCode
                )
              "
              @blur="
                validateEmptyField(
                  'clientPostCode',
                  invoice.clientAddress.postCode
                )
              "
            />
          </div>
          <div
            class="col-span-2 flex flex-col gap-[10px] text-xs text-moon-color dark:text-white md:col-span-1"
          >
            <div class="flex justify-between">
              <label class="text-xs" for="clientCountry"> Country </label>

              <span class="text-[10px] text-red-500">{{
                errors.clientCountry
              }}</span>
            </div>
            <input
              class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
              :class="[errors.clientCountry ? 'invalidBorder' : 'validBorder']"
              type="text"
              name="clientCountry"
              id="clientCountry"
              v-model.trim="invoice.clientAddress.country"
              @keyup="
                validateEmptyField(
                  'clientCountry',
                  invoice.clientAddress.country
                )
              "
              @blur="
                validateEmptyField(
                  'clientCountry',
                  invoice.clientAddress.country
                )
              "
            />
          </div>
        </div>
      </div>
      <!-- invoice date -->
      <div
        class="grid grid-cols-1 grid-rows-2 gap-[30px] md:grid-cols-2 md:grid-rows-none md:gap-[10px]"
      >
        <label
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          for="invoiceDate"
        >
          Invoice Date
          <input
            class="h-[48px] rounded-md border-[1px] border-moon-color px-4 dark:border-transparent dark:bg-[#252945]"
            type="date"
            name="invoiceDate"
            id="invoiceDate"
            placeholder="dd/mm/yyyy"
            v-model="invoice.createdAt"
            :disabled="!store.editMode"
          />
        </label>
        <label
          class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
          for="PaymentTerms"
        >
          Payment Terms
          <select
            class="h-[48px] rounded-md border-[1px] border-moon-color px-4 dark:border-transparent dark:bg-[#252945]"
            name="paymentTerms"
            id="paymentTerms"
            v-model.trim="invoice.paymentTerms"
            @change="paymentDue"
          >
            <optgroup>
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 15 Days</option>
              <option value="30">Net 30 Days</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div>
        <h2 class="text-md mb-[16px] font-bold text-muted-color">Item List</h2>
        <div>
          <div
            v-for="(item, i) in invoice.items"
            class="mb-[24px] grid w-full grid-cols-4 gap-[10px] gap-y-5 md:grid-cols-[200px_50px_90px_90px_30px]"
            :key="i"
          >
            <div
              class="col-span-4 flex flex-col gap-[10px] text-xs text-moon-color dark:text-white md:col-span-1"
            >
              <div class="flex justify-between">
                <label class="text-xs" for="itemName"> Item Name </label>
                <span class="text-[10px] text-red-500">{{
                  errors[`item${i}`]
                }}</span>
              </div>
              <input
                class="h-[48px] rounded-md px-4 dark:bg-[#252945]"
                :class="[errors[`item${i}`] ? 'invalidBorder' : 'validBorder']"
                type="text"
                name="itemName"
                id="itemName"
                v-model.trim="invoice.items[i].name"
                @keyup="validateEmptyField(`item${i}`, invoice.items[i].name)"
                @blur="validateEmptyField(`item${i}`, invoice.items[i].name)"
              />
            </div>
            <label
              class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
              for="ItemQty"
            >
              QTY.
              <input
                class="h-[48px] rounded-md border-[1px] border-moon-color px-4 dark:border-transparent dark:bg-[#252945]"
                autocomplete="of"
                min="1"
                inputmode="numeric"
                type="number"
                name="itemQty"
                id="itemQty"
                v-model.trim.number="invoice.items[i].quantity"
              />
            </label>
            <label
              class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
              for="itemPrice"
            >
              Price
              <input
                class="h-[48px] rounded-md border-[1px] border-moon-color px-4 dark:border-transparent dark:bg-[#252945]"
                autocomplete="of"
                min="1"
                inputmode="numeric"
                type="number"
                name="itemPrice"
                id="itemPrice"
                v-model.trim.number="invoice.items[i].price"
              />
            </label>
            <label
              class="flex flex-col gap-[10px] text-xs text-moon-color dark:text-white"
              for="itemTotal"
            >
              Total
              <div
                class="grid h-[48px] place-content-center rounded-md border-[1px] border-moon-color px-4 dark:border-transparent dark:bg-[#252945] dark:text-white"
                type="number"
                name="itemTotal"
                id="itemTotal"
              >
                {{ multiple(item.price, item.quantity, i) }}
              </div>
            </label>
            <button
              type="button"
              aria-label="Delete item"
              class="grid place-content-center pt-6 text-xs"
            >
              <IconDelete
                class="text-moon-color hover:text-red-500"
                @click="deleteItem(i)"
              />
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Add new item"
          class="mt-8 h-[48px] w-full rounded-full bg-[#DFE3FA] text-sm font-bold text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA] md:mt-0"
          @click="addItem"
        >
          + Add New Item
        </button>
      </div>
      <div>
        <p v-if="!validForm" class="text-xs text-red-500">
          -All fields must be added!
        </p>
        <p v-if="!validItem" class="text-xs text-red-500">
          -An item must be added!
        </p>
      </div>
      <div>
        <div
          v-if="store.editMode"
          class="absolute bottom-0 left-0 flex w-screen justify-center gap-6 bg-[#252945] py-2 shadow-xl md:relative md:h-[100px] md:w-full md:justify-end md:bg-transparent md:py-0 md:shadow-none"
        >
          <TheButton
            name="Cancel"
            btnClass="cancel"
            @click="handleEditFormCancel()"
          />
          <TheButton
            name="Save Changes"
            btnClass="paid"
            @click="handleEditForm(invoice)"
          />
        </div>
        <div
          v-else
          class="absolute bottom-0 left-0 flex w-screen items-center justify-center bg-[#252945] py-2 md:relative md:w-full md:justify-between md:bg-transparent"
        >
          <div>
            <TheButton
              name="Discard"
              btnClass="cancel"
              @click="discardInvoice()"
            />
          </div>
          <div class="flex items-center md:gap-6">
            <TheButton
              name="Save as Draft"
              btnClass="draft"
              @click="saveAsDraft(invoice)"
            />
            <TheButton
              name="Save & Send"
              btnClass="paid"
              @click="addNewInvoice(invoice)"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useInvoiceStore } from "../stores/invoice";
import TheButton from "./TheButton.vue";
import IconDelete from "./icons/IconDelete.vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import useFormValidation, {
  isValid,
  validForm,
  validItem,
  resetErrors,
} from "@/modules/useFormValidation.js";
import { DateTime } from "luxon";

const store = useInvoiceStore();
const router = useRouter();
const dt = DateTime;

const invoice = reactive({
  id: store.currentInvoice.id || uuidv4(),
  createdAt:
    store.currentInvoice.createdAt || new Date().toISOString().split("T")[0],
  paymentDue: store.currentInvoice.paymentDue,
  description: store.currentInvoice.description,
  paymentTerms: store.currentInvoice.paymentTerms,
  clientName: store.currentInvoice.clientName,
  clientEmail: store.currentInvoice.clientEmail,
  status: store.currentInvoice.status || "pending",
  senderAddress: {
    street: store.currentInvoice.senderAddress.street || "19 Union Terrace",
    city: store.currentInvoice.senderAddress.city || "London",
    postCode: store.currentInvoice.senderAddress.postCode || "E1 3EZ",
    country: store.currentInvoice.senderAddress.country || "United Kingdom",
  },
  clientAddress: {
    street: store.currentInvoice.clientAddress.street,
    city: store.currentInvoice.clientAddress.city,
    postCode: store.currentInvoice.clientAddress.postCode,
    country: store.currentInvoice.clientAddress.country,
  },
  items: [...store.currentInvoice.items],
  total: store.currentInvoice.total,
});

const { validateEmptyField, errors } = useFormValidation();

const discardInvoice = () => {
  store.toggleForm();
  resetErrors();
};

const addNewInvoice = (invoice) => {
  isValid(invoice);

  if (validForm.value) {
    store.addNewInvoice(invoice);
    store.toggleForm();
  }
};

const saveAsDraft = (invoice) => {
  isValid(invoice);
  invoice.status = "draft";

  if (validForm.value) {
    store.addNewInvoice(invoice);
    store.toggleForm();
  }
};

const handleEditForm = (invoice) => {
  isValid(invoice);

  if (validForm.value) {
    store.editInvoice(invoice);
    store.toggleForm();
    router.back();
  }
};

const handleEditFormCancel = () => {
  store.toggleForm();
  resetErrors();
  router.back();
};

const paymentDue = () => {
  if (store.editMode) {
    let due = dt
      .fromISO(invoice.createdAt)
      .plus({ days: parseInt(invoice.paymentTerms) })
      .toISODate();
    invoice.paymentDue = due;
  } else {
    let due = dt.now().plus({ days: invoice.paymentTerms }).toISODate();
    invoice.paymentDue = due;
  }
};

const multiple = (a, b, i) => {
  let total = parseFloat(a * b).toFixed(2);
  invoice.items[i].total = Number(total);
  grandTotal();
  return total;
};

const grandTotal = () => {
  let sum = 0;
  invoice.items.forEach((el) => {
    sum += el.total;
  });
  invoice.total = sum;
  store.currentInvoice.total = sum;
};

const parse = (num) => {
  return parseFloat(num).toFixed(2);
};

const deleteItem = (i) => {
  invoice.items.splice(i, 1);
};

const addItem = () => {
  invoice.items.push({
    name: "",
    quantity: 1,
    price: parse(1),
    total: parse(1),
  });
};
</script>
