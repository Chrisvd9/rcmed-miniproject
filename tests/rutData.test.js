import { data } from "../pages/rut/index/+data";
import { describe, it, expect } from "vitest";

describe("Data Function", () => {
  it("should return an error if no rut is provided", async () => {
    const result = await data({ urlParsed: { search: {} } });
    expect(result.error).toBe("el RUT es requerido.");
  });

  it("should validate a correct RUT", async () => {
    const result = await data({ urlParsed: { search: { rut: "11111111-1" } } });
    expect(result.rutValidated).toBe(true);
  });

  it("should return an error for an invalid RUT", async () => {
    const result = await data({ urlParsed: { search: { rut: "11111111-2" } } });
    expect(result.error).toBe(
      "El RUT no es válido. Por favor, inténtelo de nuevo."
    );
  });
});
