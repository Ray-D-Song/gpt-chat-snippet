<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import userConfig from '~/userConfig';

const visible = ref(false)
const opt = ref({
  model: userConfig.value.model,
  api_url: userConfig.value.api_url,
  token: userConfig.value.token
})
function open() {
  opt.value = {
    model: userConfig.value.model,
    api_url: userConfig.value.api_url,
    token: userConfig.value.token
  }
  visible.value = true
}

function handleSubmit() {
  Object.assign(userConfig.value, opt.value)
  visible.value = false
}
function handleExport() {
  const jsonData = JSON.stringify(userConfig.value, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'snippet-config.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const { files, open: chooseFile, reset, onChange } = useFileDialog({
  accept: '.json', // Set to accept only image files
})
onChange(async files => {
  try {
    if(files === null) return;
    if(files[0].type !== 'application/json')
      throw '请上传导出的 .json 文件'
    const fileContent = JSON.parse(await files[0].text())
    userConfig.value = fileContent
    opt.value = {
      model: userConfig.value.model,
      api_url: userConfig.value.api_url,
      token: userConfig.value.token
    } 
  } catch(e) {
    window.alert(e)
  }
})
function handleImport() {
  chooseFile()
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
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 mb-6">Config</DialogTitle>

                    <div class="mb-3">
                      <label for="api_url" class="block text-base font-medium text-gray-600"> 请求地址: </label>
                      <input
                          placeholder="default: https://api.openai.com"
                          class="h-9 p-2 border mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          v-model="opt.api_url"
                        />
                    </div>

                    <div class="mb-3">
                      <label for="token" class="block text-base font-medium text-gray-600"> token(api key): </label>
                      <input
                          placeholder=""
                          class="h-9 p-2 border mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          v-model="opt.token"
                        />
                    </div>

                    <div class="mb-3">
                      <label for="model" class="block text-base font-medium text-gray-600"> 模型: </label>
                      <input
                          placeholder="default: gpt-3.5-turbo"
                          class="h-9 p-2 border mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          v-model="opt.model"
                        />
                    </div>

                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 flex align-middle justify-between flex-row-reverse">
                <div class="flex gap-4">
                  <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" @click="handleSubmit">Okay</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="visible = false" ref="cancelButtonRef">Cancel</button>
                </div>
                <div class="flex gap-4">
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-200 sm:mt-0 sm:ml-3 sm:w-auto" @click="handleImport">Import</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-200 sm:mt-0 sm:w-auto" @click="handleExport">Export</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

