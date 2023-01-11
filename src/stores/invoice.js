import { defineStore } from "pinia";
import mockdata from "../../mockdata.json";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [],
    filteredInvoices: [],
    paidInvoices: [],
    pendingInvoices: [],
    draftInvoices: [],
    currentInvoice: {},
    editMode: false,
    formOpen: false,
    modalOpen: false,
    filterOpen: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getInvoices() {
      this.isLoading = true;
      this.invoices = mockdata;
      this.isLoading = false;
      this.filteredInvoices = this.invoices;
    },
    async getInvoice(id) {
      const invoice = this.invoices.find((inv) => inv.id === id);
      this.currentInvoice = invoice;
    },
    setEditModeTrue() {
      this.editMode = true;
    },
    setEditModeFalse() {
      this.editMode = false;
      this.currentInvoice = {
        id: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: 1,
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        clientAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        items: [
          {
            name: "",
            quantity: 1,
            price: 1,
            total: 1,
          },
        ],
        total: 1,
      };
    },
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    toggleFilter() {
      this.filterOpen = !this.filterOpen;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    // set filter
    setFilter(checkedCheckboxes) {
      let state = this.invoices.filter((invoice) =>
        checkedCheckboxes.includes(invoice.status)
      );
      this.filteredInvoices = [...state];
    },
    // set initial state
    setFilteredInvoices() {
      this.filteredInvoices = this.invoices;
    },
    setPaidInvoices(paid) {
      this.paidInvoices = paid;
    },
    setPendingInvoices(pending) {
      this.pendingInvoices = pending;
    },
    setDraftInvoices(draft) {
      this.draftInvoices = draft;
    },
    async deleteInvoice(id) {
      this.filteredInvoices = this.filteredInvoices.filter(
        (invoice) => invoice.id !== id
      );
      this.invoices = this.filteredInvoices;
    },
    async markAsPaid(id) {
      const invoice = this.filteredInvoices.find((el) => el.id === id);
      invoice.status = "paid";
      this.currentInvoice.status = "paid";
    },
    async editInvoice(invoice) {
      this.filteredInvoices[
        this.filteredInvoices.findIndex((inv) => inv.id === invoice.id)
      ] = invoice;
    },
    async addNewInvoice(invoice) {
      this.filteredInvoices.push(invoice);
      this.invoices = this.filteredInvoices;
    },
  },
  persist: true,
});
