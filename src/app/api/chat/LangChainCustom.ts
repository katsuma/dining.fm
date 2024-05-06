import { createStreamDataTransformer } from 'ai';

export const LangChainStreamCustom = (
  stream: any,
  { onCompletion }: { onCompletion: (completion: string) => Promise<void> }
): ReadableStream => {
  let completion = ''
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      completion += new TextDecoder('utf-8').decode(chunk)
      controller.enqueue(chunk)
    },
    async flush(controller) {
      await onCompletion(completion)
        .then(() => {
          controller.terminate()
        })
        .catch((e: any) => {
          console.error('Error', e)
          controller.terminate()
        })
    }
  })
  stream.pipeThrough(transformStream)
  return transformStream.readable.pipeThrough(createStreamDataTransformer())
}
