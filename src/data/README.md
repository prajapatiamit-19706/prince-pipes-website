# Prince Pipes & Fittings — Data Layer (v3)

Single source of truth for the Next.js site. Data only — no components, no pages, no UI.

## Folder Structure

```
data/
  products.json      All 25 products, single array (NOT one file per product)
  categories.json     5 categories, 1:1 with catalogue pages/section headers
  materials.json       6 material grades found in the catalogue
  standards.json        4 standard codes found in the catalogue
  navigation.json       Site nav (Home, About, Products+children, Downloads, Contact)
  homepage.json         Homepage config placeholders
  website.json           Feature flags
  contact.json            Address/phone/email
  footer.json              Footer display config (no schema was specified; built minimal)
  social.json               Social links (all null — none in catalogue)
  faqs.json                   Empty array — no FAQs in catalogue
  seo.json                     Global SEO placeholders
  README.md
```

## Purpose of Every File

| File | Purpose |
|---|---|
| `products.json` | Every extractable product fact, plus empty scaffolding for technical specs, media, downloads, and search that aren't in the catalogue yet |
| `categories.json` | Lookup table for `products[].categoryId` |
| `materials.json` | Lookup table for material grades referenced inside `products[].catalogue.materials` |
| `standards.json` | Lookup table for standard codes referenced inside `products[].catalogue.standard` |
| `navigation.json` | Site-wide nav structure; `children` under "Products" map to `categories.json` |
| `homepage.json` | Business decisions (hero product, featured items) — deliberately left null/empty |
| `website.json` | Global feature toggles, not product-specific |
| `contact.json` / `footer.json` / `social.json` | Layout-adjacent content, kept separate from `company.json` so a future CMS can edit them independently |
| `faqs.json` | Empty; do not populate without real client-provided Q&A |
| `seo.json` | Site-level SEO only; per-product SEO is deliberately absent from `products.json` per the schema instruction |

## Relationships Between Files

```
products.json[i].categoryId     -> categories.json[j].id
products.json[i].subcategoryId  -> controlled vocabulary (see below; no dedicated file exists)
products.json[i].catalogue.materials[] -> materials.json[].name (string match, not ID reference)
products.json[i].catalogue.standard    -> standards.json[].name (string match, not ID reference)
products.json[i].related[]      -> products.json[j].id  (currently all empty)
navigation.json .children[].categoryId -> categories.json[j].id
```

**Note on `materials`/`standard` matching:** these are stored as raw strings inside `products.json`, not as IDs, because the catalogue's own material/standard fields are free text (e.g. `"SS/ DUPLEX / MONAL / NICKEL"` split into an array). `materials.json`/`standards.json` exist as reference/lookup tables for building filter UIs, not as the join key itself. If strict referential integrity is required later, migrate `catalogue.materials`/`catalogue.standard` to store IDs instead of names.

### Subcategory ID Reference (controlled vocabulary)
No `subcategories.json` file was requested in the schema, but `subcategoryId` still needs a fixed, valid set for referential-integrity checks. The seven values in use, all validated at generation time:

`cap`, `nipple`, `socket`, `elbow`, `reducer`, `tee`, `flange`

## Naming Conventions

- **IDs** (`PPF-001`…`PPF-025`): sequential, assigned by this dataset — the catalogue has no native product ID scheme.
- **Slugs**: kebab-case, used as the Next.js dynamic segment `/products/[slug]`.
- **`family`**: groups the same physical product across different catalogue pages/standards (e.g. `weld-neck-flange` covers both "Neck Flange" on the DIN & EN Flanges page and "Welding Neck" on the ASTM-ANSI B16.5 page — verbatim-identical catalogue descriptions confirm these are the same product under two standards). 16 families total across 25 products; 9 families have only one member (no cross-standard equivalent exists in the catalogue).
- **Duplicate display names**: 7 product names repeat with different specs across pages (`Equal Tee`, `45°/90° Elbows`, `Concentric`/`Eccentric Reducers`, `Caps`, `Blind`). Each is a **separate array entry** with a disambiguating slug; `name` stays exactly as printed, `family` links them, `slug` disambiguates.

## How Next.js Should Consume This

```js
// app/products/[slug]/page.js
import products from '@/data/products.json';
import categories from '@/data/categories.json';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  const category = categories.find((c) => c.id === product.categoryId);
  const familyMembers = products.filter(
    (p) => p.family === product.family && p.slug !== product.slug
  ); // -> "Also available in..." / "Other Standards" UI
  // render product.catalogue, gate 3D/360 UI on data/website.json flags, etc.
}
```

`categories.json` drives `/products/[category]` listing pages and the nav dropdown. `family` grouping (computed via `.filter()` as above, not pre-joined in the data) powers "other standards for this product" UI without hardcoding relationships in components.

## Future CMS Migration Strategy

1. Each object in `products.json` becomes one CMS "Product" entry, keyed by `slug`.
2. `catalogue.*` fields should be locked/read-only in the CMS — they're the verified source-of-record; only `technical`, `related`, `downloads`, `media`, `search` should be marketing/ops-editable.
3. `categories.json`, `materials.json`, `standards.json` become CMS taxonomy/reference collections; keep them as the join targets even after migration.
4. `homepage.json`, `website.json`, `footer.json`, `social.json`, `seo.json` become singleton CMS content types (one entry each, not a list).
5. Once live, swap `import products from '@/data/products.json'` for a CMS fetch that returns the same shape — no component changes needed if the CMS response is mapped to this schema.

## Validation Performed (verified programmatically at generation time)

- ✓ All JSON valid, UTF-8 encoded
- ✓ 25/25 unique product IDs
- ✓ 25/25 unique product slugs
- ✓ 5/5 unique categories
- ✓ 6/6 unique materials
- ✓ 4/4 unique standards
- ✓ Every `categoryId` in `products.json` resolves to a real `categories.json` entry
- ✓ Every `subcategoryId` in `products.json` resolves to the controlled vocabulary above
- ✓ No broken references
- ✓ Naming convention consistent across all 25 entries (kebab-case IDs/slugs, PascalCase-free JSON keys)

## What This Dataset Still Does Not Contain (and why)

- No dimensions, weights, pressure ratings, or temperature ranges — `technical.*` is scaffolded empty because the catalogue gives size *ranges* only, never a full dimensional/weight chart.
- No images, 3D models, CAD/STEP files, or datasheets — `media.*` and `downloads.*` are null/empty; none exist outside the source PDF's small embedded thumbnails.
- No hero product, featured products, or priority — the catalogue never states which product(s) are top-selling.
- No FAQs, social links, working hours, or Google Map — none appear anywhere in the source catalogue.
