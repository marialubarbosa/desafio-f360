<script setup lang="ts">
import { reactive, ref } from 'vue'
import Modal from '../ui/Modal.vue'
import Input from '../ui/Input.vue'
import Select from '../ui/Select.vue'
import Button from '../ui/Button.vue'
import Segmented from '../ui/Segmented.vue'
import { categories } from '../../mocks/transactionsMock'


const props = defineProps<{
  modelValue: boolean
  transaction?: any
  type?: 'add' | 'delete'
}>()

const deleteDescription = ref<string>(`Tem certeza que deseja excluir esta transação? Esta ação não poderá ser desfeita e removerá permanentemente o registro dos seus relatórios.`);
const addDescription = ref<string>('Informe os detalhes da sua movimentação financeira.');
const categoriesOptions = categories.map(c => ({ label: c, value: c }));

  const emit = defineEmits([
  'update:modelValue',
  'save',
  'delete'
])

const form = reactive({
  description: '',
  value: '',
  date: '',
  type: 'expense',
  category: ''
})

function close() {
  emit('update:modelValue', false)
}

function save() {
  emit('save', { ...form })
}

function remove() {
  emit('delete')
}
</script>

<template>
  <Modal
    :modelValue="modelValue"
    :title="type === 'add' ? 'Criar Transação' : 'Excluir Transação'"
    :description="type === 'add' ? addDescription : deleteDescription"
    @update:modelValue="close"
  >
    <div  class="space-y-5">

      <div v-if="type === 'add'">
        <!-- descrição -->
        <div class="mt-2 mb-4">

          <label class="text-[14px] text-neutral-600">Descrição</label>
          <Input
            v-model="form.description"
          />
        </div>

        <!-- valor + data -->
        <div class="grid grid-cols-2 gap-4 mt-2 mb-4">
          <div>
            <label class="text-[14px] text-neutral-600">Valor</label>

            <Input
              v-model="form.value"
            />
          </div>

          <div>
            <label class="text-[14px] text-neutral-600">Data</label>

            <Input
              v-model="form.date"
            />
          </div>
        </div>

        <!-- tipo -->
        <div class="mt-2 mb-4">
          <label class="text-[14px] text-neutral-600">Tipo</label>

          <Segmented
            v-model="form.type"
            :options="[
              { label: 'Receita', value: 'income' },
              { label: 'Despesa', value: 'expense' }
            ]"
          />
        </div>

        <!-- categoria -->
        <div class="mt-2 mb-6">
          <label class="text-[14px] text-neutral-600">Categoria</label>

          <Select
            v-model="form.category"
            :options="categoriesOptions"
          />
        </div>
      </div>

      <!-- actions -->
      <div class="flex justify-between pt-2">

        <Button
          variant="white"
          @click="close"
        >
          Cancelar
        </Button>

        <Button
          :variant="type === 'delete' ? 'danger' : 'primary'"
          @click="save"
        >
          {{`${type === 'delete' ? 'Excluir' : 'Salvar Alterações'}`}}
        </Button>

      </div>

    </div>
</Modal>
</template>