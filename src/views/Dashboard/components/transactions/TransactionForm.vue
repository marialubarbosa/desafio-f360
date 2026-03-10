<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { transactionSchema, type TransactionFormData } from '@/schemas/transactionSchema'

import { useFormField } from '@/composables/useFormField'
import FormField from '@/components/ui/FormField.vue'

import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Segmented from '@/components/ui/Segmented.vue'
import Button from '@/components/ui/Button.vue'
import InputMoney from '@/components/ui/InputMoney.vue'
import DateInput from '@/components/ui/DateInput.vue'

import { categories } from '@/mocks/transactionsMock'

const emit = defineEmits(['submit', 'close'])

const categoriesOptions = categories.map(c => ({
  label: c,
  value: c
}))

const { resetForm, meta } = useForm<TransactionFormData>({
  validationSchema: toFormValidator(transactionSchema),
  initialValues: {
    description: '',
    value: undefined,
    date: '',
    type: 'expense',
    category: ''
  }
})

const description = useFormField<string>('description')
const value = useFormField<number>('value')
const date = useFormField<string>('date')
const type = useFormField<'income' | 'expense'>('type')
const category = useFormField<string>('category')

const onSubmit = () => {
  const transactionData: TransactionFormData = {
    description: description.value.value,
    value: value.value.value,
    date: date.value.value,
    type: type.value.value,
    category: category.value.value
  }
  emit('submit', transactionData)
  resetForm()
}
</script>

<template>
  <Form v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">

    <FormField
      label="Descrição"
      :error="description.errorMessage.value"
    >
      <Input v-model="description.value.value" :error="!!description.errorMessage.value"/>
    </FormField>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

        <FormField
        label="Valor"
        :error="value.errorMessage.value"
        >
            <InputMoney
                v-model="value.value.value"
                :error="!!value.errorMessage.value"
            />
        </FormField>

        <FormField
        label="Data"
        :error="date.errorMessage.value"
        >
        <DateInput
            v-model="date.value.value"
            :error="!!date.errorMessage.value"
        />
        </FormField>

    </div>


    <FormField
      label="Tipo"
      :error="type.errorMessage.value"
    >
      <Segmented
        v-model="type.value.value"
        :options="[
          { label: 'Receita', value: 'income' },
          { label: 'Despesa', value: 'expense' }
        ]"
      />
    </FormField>


    <FormField
      label="Categoria"
      :error="category.errorMessage.value"
    >
      <Select
        v-model="category.value.value"
        :options="categoriesOptions"
        :error="!!category.errorMessage.value"
      />
    </FormField>


    <div class="flex flex-col md:flex-row justify-between gap-2 pt-2">

      <Button
        variant="white"
        @click="emit('close')"
      >
        Cancelar
      </Button>

      <Button
        variant="primary"
        type="submit"
        :disabled="!meta.valid"
      >
        Salvar Alterações
      </Button>

    </div>

    </form>
  </Form>
</template>