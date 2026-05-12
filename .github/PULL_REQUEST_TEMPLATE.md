## Summary

<!-- What does this PR do and why? 2-3 bullet points max. -->

-
-

## Type of Change

- [ ] feat — new API endpoint or feature
- [ ] fix — bug fix
- [ ] refactor — no behaviour change
- [ ] chore — deps, config, tooling
- [ ] docs — documentation only

## Affected Domain(s)

<!-- e.g. order, parcel, auth, bulk-upload -->

## API Changes

<!-- List any new/modified endpoints, stored procedure calls, or request/response shape changes. -->

## Testing

- [ ] Tested in Bruno Desktop
- [ ] All existing Bruno collections still pass
- [ ] Edge cases covered (invalid payloads, missing fields, duplicate checks)

## Checklist

- [ ] Follows SP-only repository pattern (no raw SQL)
- [ ] Zod validation added for all new request payloads
- [ ] JSDoc added for new service/repository methods
- [ ] `receiver_status_details` append-only rule respected (no updates/deletes)
- [ ] No secrets or credentials hardcoded
- [ ] `api-manifest.yaml` updated if endpoints changed

## Related Issues

Closes #
