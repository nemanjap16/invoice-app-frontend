import { reactive, ref } from "vue";

const errors = reactive({});

export let validForm = ref(true);
export let validItem = ref(true);

export const isValid = (invoice) => {
  validForm.value = true;

  for (const [key, value] of Object.entries(invoice)) {
    if (value === "") {
      validate(key, value);
      validForm.value = false;
    }
    if (key === "description" || key === "paymentDue") {
      validForm.value = true;
    }
  }

  for (const [key, value] of Object.entries(invoice.senderAddress)) {
    if (value === "") {
      if (key === "street") {
        validate("senderAddress", value);
      }
      if (key === "country") {
        validate("senderCountry", value);
      }
      if (key === "city") {
        validate("senderCity", value);
      }
      if (key === "postCode") {
        validate("senderPostCode", value);
      }
      validForm.value = false;
    }
  }

  for (const [key, value] of Object.entries(invoice.clientAddress)) {
    if (value === "") {
      if (key === "street") {
        validate("clientAddress", value);
      }
      if (key === "country") {
        validate("clientCountry", value);
      }
      if (key === "city") {
        validate("clientCity", value);
      }
      if (key === "postCode") {
        validate("clientPostCode", value);
      }
      validForm.value = false;
    }
  }

  invoice.items.map((item, i) => {
    if (item.name === "") {
      validate(`item${i}`, item.name);
      validForm.value = false;
      validItem.value = false;
    } else {
      validItem.value = true;
    }
  });

  return {
    validForm,
    validItem,
  };
};

export const resetErrors = () => {
  for (const [key, value] of Object.entries(errors)) {
    errors[key] = "";
  }
  validForm = ref(true);
  validItem = ref(true);
};

export const validateEmptyField = (fieldName, fieldValue) => {
  errors[fieldName] = fieldValue === "" ? "Can't be empty!" : "";
};

const validate = (fieldName, fieldValue) => {
  validateEmptyField(fieldName, fieldValue);
};

export default function useFormValidation() {
  // const validateEmptyField = (fieldName, fieldValue) => {
  //   errors[fieldName] = fieldValue === "" ? "Can't be empty!" : "";
  // };
  validateEmptyField();
  return { errors, validateEmptyField };
}
