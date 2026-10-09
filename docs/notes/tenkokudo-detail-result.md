# Tenkokudō exhibitor detail

IMPLEMENTED
- Added `/vystavovatele/tenkokudo` within the existing App routing and SEO route definitions.
- Updated only Tenkokudō content in cs/en/de/es/ja/vi/zh exhibitors and added localized SEO entries.
- Card uses a same-tab localized internal link. Detail contains full supplied text and custom-order box (500 CZK per character).
- Responsive detail renderer supports a data-driven gallery with localized alt text.

VERIFIED
- JSON parsing, unique exhibitor ID, six order details and static route definitions passed for all seven locales.
- Local Vite-source Chromium checks passed for all seven locales: keyboard card navigation, heading, price, three description paragraphs, six order details, existing image loading and no horizontal overflow at 375px.
- `graphify update .` completed (627 nodes, 899 edges).

BLOCKED
- Three requested images were absent from supplied attachments and public exhibitors assets. Existing `tenkokudo.png` is used temporarily; gallery arrays are empty. No images were generated or substituted.

NOT RUN
- Build, lint, full suites and production tests, per task restrictions. Static HTML output was not regenerated.

Next action: obtain the three original images, place them under public/images/exhibitors, and populate the hero and localized gallery entries.
