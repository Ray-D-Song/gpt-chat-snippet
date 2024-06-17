import userConfig from '~/userConfig'

export default function useChat() {
  const answer = ref('')
  const loading = ref(false)

  async function send(content: string) {
    try {
      loading.value = true
      const userMessages = [{ role: 'user', content: content }]
      const requestData = JSON.stringify({
        model: userConfig.value.model,
        messages: userMessages,
        stream: true,
      })
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userConfig.value.token}`,
        },
        body: requestData,
      }
      const response = await fetch(`${userConfig.value.api_url.endsWith('/')?userConfig.value.api_url:`${userConfig.value.api_url}/`}v1/chat/completions`, fetchOptions)
      // @ts-ignore
      const reader = response.body.getReader()
      answer.value = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
      
        const chunkStr = new TextDecoder('utf-8').decode(value)
        const lines = chunkStr
          .split('\n')
          .filter((line) => line !== '' && line.length > 0)
          .map((line) => line.replace(/^data: /, '').trim())
          .filter((line) => line !== '[DONE]')
          .map((line) => JSON.parse(line))
        for (const line of lines) {
          const {
            choices: [
              {
                delta: { content },
              },
            ],
          } = line
          if (content) {
            answer.value += content.replace(/\n/g, '\n')
          }
        }
      }
      
    } catch(e: any) {
      console.error(e)
      answer.value = e.response.data.error.message
    } finally {
      console.log(answer.value)
      loading.value = false
    }
  }

  return {
    answer,
    loading,
    send
  }
}