import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AiAssistant } from "../../components/ai-assistant"
import "@testing-library/jest-dom"
import jest from "jest" // Import jest to declare the variable

// Mock the API call
global.fetch = jest.fn((url) => {
  if (url === "/api/legal-query") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ advice: "This is a mocked legal advice." }),
    })
  }
  return Promise.reject(new Error("unknown url"))
})

describe("AiAssistant", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the AI Assistant component", () => {
    render(<AiAssistant />)
    expect(screen.getByText("AI Assistant Prawny")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Wpisz swoje pytanie prawne...")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Zadaj pytanie/i })).toBeInTheDocument()
  })

  it("updates input value on change", () => {
    render(<AiAssistant />)
    const input = screen.getByPlaceholderText("Wpisz swoje pytanie prawne...")
    fireEvent.change(input, { target: { value: "Test query" } })
    expect(input).toHaveValue("Test query")
  })

  it("displays loading state when submitting", async () => {
    render(<AiAssistant />)
    const input = screen.getByPlaceholderText("Wpisz swoje pytanie prawne...")
    const button = screen.getByRole("button", { name: /Zadaj pytanie/i })

    fireEvent.change(input, { target: { value: "Test query" } })
    fireEvent.click(button)

    expect(button).toHaveTextContent("Ładowanie...")
    expect(button).toBeDisabled()
  })

  it("displays legal advice after successful submission", async () => {
    render(<AiAssistant />)
    const input = screen.getByPlaceholderText("Wpisz swoje pytanie prawne...")
    const button = screen.getByRole("button", { name: /Zadaj pytanie/i })

    fireEvent.change(input, { target: { value: "Test query" } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Odpowiedź AI:")).toBeInTheDocument()
      expect(screen.getByText("This is a mocked legal advice.")).toBeInTheDocument()
    })

    expect(button).toHaveTextContent("Zadaj pytanie")
    expect(button).not.toBeDisabled()
  })

  it("displays error message on API failure", async () => {
    // Mock fetch to return an error
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to fetch advice" }),
      }),
    )

    render(<AiAssistant />)
    const input = screen.getByPlaceholderText("Wpisz swoje pytanie prawne...")
    const button = screen.getByRole("button", { name: /Zadaj pytanie/i })

    fireEvent.change(input, { target: { value: "Test query" } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Wystąpił błąd podczas pobierania porady prawnej.")).toBeInTheDocument()
    })
  })
})
