<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use Cloud Auth for account identity; never authorize subscriptions from a locally stored email or flag.
- Stripe server functions require authenticated middleware and derive customer email from verified auth; only the configured active Premium price grants access.
- Keep the public landing and subscription dialog in focused components; the existing study workspace retains its current local study data until its Cloud migration is implemented.
