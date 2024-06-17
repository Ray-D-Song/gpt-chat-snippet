<script setup lang="ts">
import ChatDialog from './components/ChatDialog.vue'
import userConfig from './userConfig'
// TODO: file api
// const { isSupported, data, file, fileName, fileMIME, fileSize, fileLastModified, create, open, save, saveAs, updateData } = useFileSystemAccess()

const chatDialogRef = ref<InstanceType<typeof ChatDialog>>()

function handleDeleteSnippet(idx: number) {
  userConfig.value.snippet.splice(idx, 1)
}
</script>

<template>
  <div>
    <ChatDialog ref="chatDialogRef" />
    <section class="w-full text-right">
      <BtnGroup class="m-2"/>
    </section>
    <section class="mt-4 flex flex-wrap flex-row">
      <Card @click="chatDialogRef?.open(item)" @del="handleDeleteSnippet" v-bind="item" v-for="(item, idx) in userConfig.snippet" :idx :key="idx" class="m-4 relative"/>
    </section>
  </div>
</template>
