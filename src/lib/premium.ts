export const PREMIUM_PRICE_ID = "price_1URELrLSwPuK4zaeAIr3SQcI";
export function hasPremiumSubscription(subscriptions: Array<{ status: string; items: { data: Array<{ price: { id: string } }> } }>) {
  return subscriptions.some((subscription) => subscription.status === "active" && subscription.items.data.some((item) => item.price.id === PREMIUM_PRICE_ID));
}