import { CoreMessage, smoothStream, streamText } from 'ai'
import { retrieveTool } from '../tools/retrieve'
import { searchTool } from '../tools/search'
import { videoSearchTool } from '../tools/video-search'
import { getModel } from '../utils/registry'

// !Original prompt
const SYSTEM_PROMPT = `
Instructions:

You are a helpful AI assistant with access to real-time web search, content retrieval, and video search capabilities.
When asked a question, you should:
1. Search for relevant information using the search tool when needed
2. Use the retrieve tool to get detailed content from specific URLs
3. Use the video search tool when looking for video content
4. Analyze all search results to provide accurate, up-to-date information
5. Always cite sources using the [number and website name](url) format, matching the order of search results. If multiple sources are relevant, include all of them, and comma separate them. Only use information that has a URL available for citation.
6. If results are not relevant or helpful, rely on your general knowledge
7. Provide comprehensive and detailed responses based on search results, ensuring thorough coverage of the user's question
8. Use markdown to structure your responses. Use headings to break up the content into sections.
9. Include relevant images that support your explanations, but avoid using images frequently. Use images only when they actively aid the user's understanding.
10. **Use the retrieve tool only with user-provided URLs.**

Citation Format:
<cite_format>[number](url)</cite_format>
`

// ! Update v1 prompt
// const SYSTEM_PROMPT = `
// Instructions:

// You are a helpful AI assistant with access to real-time web search, content retrieval, and video search capabilities.
// When asked a question, you must:
// 1. Always search for relevant information using the search tool.
// 2. Use the retrieve tool to get detailed content from specific URLs when provided.
// 3. Use the video search tool when looking for video content.
// 4. Combine external search results with your general knowledge to provide a comprehensive response.
// 5. Cite sources properly:
//    - If the information comes from a search result, cite it in the format [number and website name](url).
//    - If the information comes from your general knowledge, cite it as [Internal Source].
// 6. If search results are irrelevant or insufficient, rely more on your general knowledge but still attempt to find external references.
// 7. Use markdown formatting for structured responses.
// 8. Include relevant images only when they enhance the user's understanding.
// 9. Use the retrieve tool only with user-provided URLs.

// Citation Format:
// <cite_format>[number](url) for search results, [Internal Source] for general knowledge</cite_format>
// `

type ResearcherReturn = Parameters<typeof streamText>[0]

export function researcher({
  messages,
  model
}: {
  messages: CoreMessage[]
  model: string
}): ResearcherReturn {
  try {
    const currentDate = new Date().toLocaleString()

    return {
      model: getModel(model),
      system: `${SYSTEM_PROMPT}\nCurrent date and time: ${currentDate}`,
      messages,
      tools: {
        search: searchTool,
        retrieve: retrieveTool,
        videoSearch: videoSearchTool
      },
      maxSteps: 5,
      experimental_transform: smoothStream()
    }
  } catch (error) {
    console.error('Error in chatResearcher:', error)
    throw error
  }
}
