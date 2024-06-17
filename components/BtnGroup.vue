<script setup lang="ts">
import NewSnippetDialog from './NewSnippetDialog.vue'
import ConfigDialog from './ConfigDialog.vue'

const newSnippetDialogRef = ref<InstanceType<typeof NewSnippetDialog>>()
const configDialogRef = ref<InstanceType<typeof ConfigDialog>>()
function navGitHub() {
  window.location.href = 'https://github.com/ray-d-song/gpt-chat-snippet'
}
</script>

<template>
  <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
    <NewSnippetDialog ref="newSnippetDialogRef" />
    <ConfigDialog ref="configDialogRef" />
    <button
      class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
      title="新增"
      @click="newSnippetDialogRef?.open"
    >
      <Icon name="i-mdi:plus-box-multiple-outline" size="20" />
    </button>
    <button
      class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
      title="配置"
      @click="configDialogRef?.open"
    >
      <Icon name="i-mdi:file-settings-cog-outline" size="20" />
    </button>
    <button
      class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
      title="GitHub"
      @click="navGitHub"
    >
      <Icon name="i-mdi:github" size="20" />
    </button>
  </span>
</template>