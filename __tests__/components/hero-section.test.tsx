import { render, screen, fireEvent } from "@testing-library/react"
import { HeroSection } from "../../components/hero-section"
import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

describe("HeroSection", () => {
  const mockOnSectionChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the hero section with correct title and description", () => {
    render(<HeroSection onSectionChange={mockOnSectionChange} />)

    expect(screen.getByText("Legal API Nexus")).toBeInTheDocument()
    expect(screen.getByText("Profesjonalna Pomoc Prawna")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24 godzin. Profesjonalnie, szybko i w przystępnej cenie.",
      ),
    ).toBeInTheDocument()
  })

  it('calls onSectionChange with "pisma-prawne" when "Zamów analizę" button is clicked', () => {
    render(<HeroSection onSectionChange={mockOnSectionChange} />)
    const orderAnalysisButton = screen.getByRole("button", { name: /Zamów analizę/i })
    fireEvent.click(orderAnalysisButton)
    expect(mockOnSectionChange).toHaveBeenCalledWith("pisma-prawne")
  })

  it('calls onSectionChange with "jak-to-dziala" when "Jak to działa?" button is clicked', () => {
    render(<HeroSection onSectionChange={mockOnSectionChange} />)
    const howItWorksButton = screen.getByRole("button", { name: /Jak to działa\?/i })
    fireEvent.click(howItWorksButton)
    expect(mockOnSectionChange).toHaveBeenCalledWith("jak-to-dziala")
  })
})
