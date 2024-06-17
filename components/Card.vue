<script setup lang="ts">
export interface Props {
  desc: string
  content: string
  idx: number
}

const props = withDefaults(defineProps<Props>(), {
  content: 'Hello, gpt',
  desc: 'Hello'
})
const emit = defineEmits<{
  del: [idx: number]
}>()
</script>

<template>
  <a href="#" class="group relative block w-80 h-64">
    <span class="absolute inset-0 border-2 border-dashed border-black"></span>
  
    <div
      class="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
    >
      <Icon name="i-mingcute:close-fill" @click.stop="emit('del', idx)" size="30" class="hover:text-red-600 absolute right-0 top-0 z-10" />
      <div
        class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
      >
        <Icon name="i-mdi:chat-processing-outline" size="40" />
  
        <h2 class="mt-4 text-xl font-medium sm:text-2xl">{{ props.desc }}</h2>
      </div>
  
      <div
        class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
      >
  
        <p class="mt-4 text-sm sm:text-base">
          {{ props.content.replace(/\$\{\d+\}/g, '_______') }}
        </p>
  
        <p class="mt-8 font-bold">Chat</p>
      </div>
    </div>
  </a>
</template>