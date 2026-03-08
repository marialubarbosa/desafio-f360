<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  description?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <div
          class="w-full max-w-[440px] mx-2 md:mx-0 rounded-xl md:rounded-3xl bg-white shadow-xl overflow-hidden"
        >
          <!-- header -->
          <div class="flex justify-between items-start p-4 md:p-6">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">
                {{ title }}
              </h2>

              <p class="text-gray-500 mt-1">
                {{ description }}
              </p>
            </div>

            <button
              @click="close"
              class="text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div class="border-t border-neutral-200"></div>

          <!-- body -->
          <div class="p-4 md:p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>