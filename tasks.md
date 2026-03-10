# Refund Automation — Remaining Tasks

## Task Formatting Instructions

- [ ] Some Task.
- [x] Completed task.
  - [ ] Subtask indented two spaces.
  - [x] Completed subtask.
  - [ ] 
When completing a task, complete all it's sub-tasks.
After completing a task, mark it as completed.

---

**Status:** Core implementation complete. The items below are what remains before the refund system is fully production-ready.

---

## Pre-Launch Verification

### Lemon Squeezy API
- [ ] Confirm `LEMON_SQUEEZY_API_KEY` has **read orders** and **issue refunds** permissions
- [ ] Verify the refund endpoint (`POST /orders/{orderId}/refund`) matches Lemon Squeezy's current API docs
- [ ] Confirm what Lemon Squeezy shows customers as the "Order ID" in their receipt emails (numeric ID vs. other format)

### Vercel Environment Variables
- [ ] Ensure `LEMON_SQUEEZY_API_KEY` is set in Vercel project settings (not just local `.env`)
- [ ] Ensure `DATABASE_URL` is set in Vercel project settings

---

## Email Notifications (Phase 4)

Requires choosing and configuring an email service (Resend, SendGrid, etc.).

### Success Email
- [ ] Choose email provider and add API key to env
- [ ] Create "Refund Approved" email template:
  - Confirmation of refund
  - Refund amount
  - Expected arrival: "5–10 business days"
  - Order ID reference
  - Link to support
- [ ] Send to customer email on successful refund

### Rejection Email (Optional)
- [ ] Create "Refund Ineligible" template:
  - Reason (outside 30 days, already refunded, etc.)
  - Link to support contact
- [ ] Send to customer email on rejection

### Admin Alert
- [ ] Create internal refund summary email
- [ ] Send to admin email on each refund (approved or rejected)
- [ ] Include: email, order ID, amount, timestamp

---

## Caching (Optional — Performance)

### Order Details Cache
- [ ] Cache Lemon Squeezy order responses (TTL: 1 hour)
- [ ] Reduces redundant API calls for repeated lookups
- [ ] Options: Redis or in-memory with TTL

---

## Testing

### Manual Testing (Pre-Deploy)
- [ ] Test with a **Lemon Squeezy test-mode** order: submit valid refund request, confirm auto-refund
- [ ] Submit request outside 30-day window — confirm rejection message
- [ ] Submit duplicate request for same order — confirm prevention
- [ ] Submit with mismatched email — confirm validation error
- [ ] Submit with invalid/nonexistent order ID — confirm "not found" error
- [ ] Hit rate limit (6 requests in 1 hour) — confirm 429 response

### Automated Tests (Nice to Have)
- [ ] Unit tests for date validation, email validation, rate limiting logic
- [ ] Integration tests with mocked Lemon Squeezy API responses
- [ ] Full flow tests: valid request → success, each error case

---

## Monitoring & Alerts

- [ ] Set up error tracking (Sentry, LogRocket, or Vercel logs)
- [ ] Monitor for refund request spikes (potential abuse)
- [ ] Track success/failure rates via `refund_requests` table queries

---

## Documentation

- [ ] Add FAQ to support page: "Where's my refund?" / "How long does it take?"
- [ ] Add JSDoc comments to `app/api/refund-request/route.ts` functions
- [ ] Document the refund system in the project README

---

## Deployment

- [ ] Deploy to production
- [ ] Monitor first 24 hours for issues
- [ ] Verify refund form is accessible at `/refund-request`
- [ ] Verify Support page and Refund Policy page link correctly to the form
