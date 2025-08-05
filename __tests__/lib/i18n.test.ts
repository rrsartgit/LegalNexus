import { getDictionary } from "../../lib/i18n"

describe("i18n", () => {
  it('should return the correct dictionary for "en"', async () => {
    const dict = await getDictionary("en")
    expect(dict.hello).toBe("Hello")
    expect(dict.welcome).toBe("Welcome")
  })

  it('should return the correct dictionary for "pl"', async () => {
    const dict = await getDictionary("pl")
    expect(dict.hello).toBe("Witaj")
    expect(dict.welcome).toBe("Witaj")
  })

  it('should default to "en" if an unsupported locale is provided', async () => {
    const dict = await getDictionary("fr") // Unsupported locale
    expect(dict.hello).toBe("Hello")
    expect(dict.welcome).toBe("Welcome")
  })
})
