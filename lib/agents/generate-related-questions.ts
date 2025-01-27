import { relatedSchema } from '@/lib/schema/related'
import { CoreMessage, generateObject } from 'ai'
import { getModel } from '../utils/registry'

export async function generateRelatedQuestions(
  messages: CoreMessage[],
  model: string
) {
  const lastMessages = messages.slice(-1).map(message => ({
    ...message,
    role: 'user'
  })) as CoreMessage[]

  const result = await generateObject({
    model: getModel(model),
    system: `
As a professional construction researcher, your task is to design three queries that deeply explore the topics within the technical construction document. The queries should be structured to further understand various technical aspects, practical applications, or relevant implications.  

For example, if the document covers specifications for tension poles in electrical distribution systems, your queries might include:
1. "How does the design of tension poles affect the performance of the electrical distribution system at maximum distances?"
2. "What are the key differences between tension poles with and without circuit breakers?"
3. "When should specific types of insulators be used for tension poles?"

The goal of these queries is to help the user delve into technical details, field applications, and potential innovative solutions based on the information in the document. Ensure your responses are relevant to the user's language and technical context.

    `,
    messages: lastMessages,
    schema: relatedSchema
  })

  return result
}
