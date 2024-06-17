<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { Snippet } from '~/types'
import useChat from '~/hooks/useChat'
import * as clipboard from 'clipboard-polyfill'

const visible = ref(false)
const snippet = reactive({
  content: '',
  desc: ''
})

function open(val: Snippet) {
  answer.value = ''
  inputValues.value = inputValues.value.map((item) => item = '')
  Object.assign(snippet, val)
  visible.value = true
}
const inputValues = ref<string[]>([])
const currentInputIdx = ref(0)
const fragments = ref<string[]>([])
watch(() => snippet.content, () => {
  fragments.value = snippet.content.split(/\$\{\d+\}/g) 
  if(fragments.value.length < 1) return;
  for(let i = 0; i < fragments.value.length-1; i++) {
    inputValues.value.push('')
  }
})

const { answer, loading, send } = useChat()
function handleSend() {
  let counter = 0
  send(snippet.content.replace(/\$\{\d+\}/g, () => inputValues.value[counter++]))
}

const copyIconName = ref('i-mingcute:copy-2-fill')
function handleCopy() {
  clipboard.writeText(answer.value)
  copyIconName.value = 'i-mdi:success-bold'
  setTimeout(() => {
    copyIconName.value = 'i-mingcute:copy-2-fill'
  }, 2000)
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
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-8/12">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="h-64 overflow-y-scroll mb-10">
                  <div class="w-full flex justify-between sm:ml-4 text-base font-semibold leading-6 text-gray-900">
                    <span>Reply </span>
                    <Icon v-if="loading" name="i-eos-icons:three-dots-loading" size="30"/>
                    <Icon :name="copyIconName" @click="handleCopy" class="mr-8 text-gray-600 hover:cursor-pointer" v-else size="24"></Icon>
                  </div>
                  <pre class="mt-4">{{answer}}</pre>
                </div>
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-left ml-4">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ snippet.desc }}</DialogTitle>
                    <div class="mt-2 flex justify-around gap-8">
                      <div class="w-[30rem] break-words h-80 overflow-scroll">
                        <template v-for="(fra, idx) in fragments" :key="idx">
                          <pre class="text-sm text-gray-500 leading-10">{{ fra }}</pre>
                          <pre @click="currentInputIdx = idx" v-if="idx !== (fragments.length-1)" :class="`mx-2 text-blue-800 text-sm border-blue-800 hover:cursor-pointer leading-10 ${inputValues[idx].length !== 0 ? 'border-b' : ''}`">{{ inputValues[idx].length === 0 ? '____点击输入____' : inputValues[idx] }}</pre>
                        </template>
                      </div>
                      <div class="border-r-2 border-dashed"/>
                      <div class="w-80">
                          <textarea
                            v-model="inputValues[currentInputIdx]"
                            class="mt-2 p-2 h-64 w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm"
                            rows="4"
                            placeholder="输入该片段" 
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button v-if="!loading" type="button" class="w-16 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" @click="handleSend">Send</button>
                <button v-else type="button" class="inline-flex w-16 justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">
                  <Icon name="i-eos-icons:three-dots-loading" size="20"/> 
                </button>
                <button type="button" class="mt-3 inline-flex w-16 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="visible = false" ref="cancelButtonRef">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
