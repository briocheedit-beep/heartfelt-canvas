import { describe, expect, it } from "vitest";
import { hasPremiumSubscription, PREMIUM_PRICE_ID } from "@/lib/premium";
describe("Paid Premium access", () => {
  const sub = (status: string, price = PREMIUM_PRICE_ID) => ({ status, items: { data: [{ price: { id: price } }] } });
  it("never grants access without a subscription", () => expect(hasPremiumSubscription([])).toBe(false));
  it("grants access only for the paid Oboulo subscription", () => expect(hasPremiumSubscription([sub("active")])).toBe(true));
  it("blocks unpaid and canceled subscriptions", () => { for (const status of ["incomplete", "past_due", "canceled", "unpaid", "trialing"]) expect(hasPremiumSubscription([sub(status)])).toBe(false); });
  it("blocks another product's subscription", () => expect(hasPremiumSubscription([sub("active", "price_other")])).toBe(false));
});