import { POST } from "../../app/api/legal-query/route"
import { NextRequest } from "next/server"
import jest from "jest"

// Mock the generateText function from ai
jest.mock("ai", () => ({
  generateText: jest.fn(() => ({
    text: "Mocked legal advice.",
  })),
}))

// Mock the openai function from @ai-sdk/openai
jest.mock("@ai-sdk/openai", () => ({
  openai: jest.fn(() => "mock-openai-model"),
}))

describe("Legal Query API", () => {
  it("should return legal advice for a given query", async () => {
    const mockRequest = new NextRequest("http://localhost/api/legal-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "What are my rights as a tenant?" }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ advice: "Mocked legal advice." })
  })

  it("should return 400 if query is missing", async () => {
    const mockRequest = new NextRequest("http://localhost/api/legal-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toEqual({ error: "Query is required" })
  })
})
