<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Button from '@/components/ui/Button.vue'
import type { Transaction } from '@/types/transaction'
import TransactionForm from '@/views/Dashboard/components/transactions/TransactionForm.vue'


const props = defineProps<{
  modelValue: boolean
  transaction?: Transaction
  type?: 'add' | 'delete'
}>()

const deleteDescription = ref<string>(`Tem certeza que deseja excluir esta transação? Esta ação não poderá ser desfeita e removerá permanentemente o registro dos seus relatórios.`);
const addDescription = ref<string>('Informe os detalhes da sua movimentação financeira.');


  const emit = defineEmits([
  'update:modelValue',
  'save',
  'delete'
])




function close() {
  emit('update:modelValue', false)
}


function confirm() {
  if (props.type === 'delete') {
    remove()
  }
}

function save(values: any) {
  emit('save', { ...values })
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
    <div class="space-y-5">

      <TransactionForm v-if="type === 'add'" @submit="save" @close="close"/>

      <div v-else class="flex justify-between pt-2">

        <Button variant="white" @click="close">Cancelar</Button>

        <Button variant="danger" @click="confirm" >Excluir</Button>

      </div>

    </div>
</Modal>
</template>