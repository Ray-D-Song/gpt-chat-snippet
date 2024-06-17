<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import userConfig from '~/userConfig';

const visible = ref(false)
const newSnippet = ref({
  content: '',
  desc: ''
})
function open() {
  newSnippet.value = {
    content: '',
    desc: ''
  }
  visible.value = true
}
function handleNew() {
  userConfig.value.snippet.push(newSnippet.value)
  visible.value = false
}

defineExpose({
  open
})
</script>

<template>
  <TransitionRoot as="template" :show="visible">
    <Dialog class="relative z-10" @close="visible = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="w-full sm:flex sm:items-start">
                  <div class="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">New</DialogTitle>
                    <!-- <div> -->
                      <input
                        type="email"
                        id="UserEmail"
                        placeholder="标签"
                        class="mt-1 p-2 h-10 w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                        v-model="newSnippet.desc"
                      />
                      <textarea
                        id="OrderNotes"
                        class="mt-2 p-2 h-64 w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm"
                        rows="4"
                        v-model="newSnippet.content"
                        placeholder="对话片段, 使用${数字}作为占位符. 
例如: 请将${1}翻译为法语"
                      ></textarea>
                    <!-- </div> -->
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" @click="handleNew">Okay</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="visible = false" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

