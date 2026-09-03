// Data extracted from public/images/products directory

export const galleryCategories = [
  "All",
  "Stainless Steel",
  "Carbon Steel",
  "Alloy Steel",
  "Duplex Steel",
  "Super Duplex",
  "Inconel 625"
];

// Helper to create objects
const createItem = (id, src, category, alt) => ({
  id,
  src,
  category,
  alt
});

export const galleryItems = [
  // Alloy Steel
  createItem("as-1", "/images/products/alloy-steel-pipe-fittings/Alloy Steel 45 Degree Elbow-main.webp", "Alloy Steel", "Alloy Steel 45 Degree Elbow"),
  createItem("as-2", "/images/products/alloy-steel-pipe-fittings/Alloy Steel 90 Degree Elbow-main.webp", "Alloy Steel", "Alloy Steel 90 Degree Elbow"),
  createItem("as-3", "/images/products/alloy-steel-pipe-fittings/Alloy Steel Bend-main.webp", "Alloy Steel", "Alloy Steel Bend"),
  createItem("as-4", "/images/products/alloy-steel-pipe-fittings/Alloy Steel Concentric Reducer-main.webp", "Alloy Steel", "Alloy Steel Concentric Reducer"),
  createItem("as-5", "/images/products/alloy-steel-pipe-fittings/Alloy Steel Cross-main.webp", "Alloy Steel", "Alloy Steel Cross"),
  createItem("as-6", "/images/products/alloy-steel-pipe-fittings/Alloy Steel End Cap-main.webp", "Alloy Steel", "Alloy Steel End Cap"),
  
  // Carbon Steel
  createItem("cs-1", "/images/products/carbon-steel-pipe-fittings/45-elbow-main.webp", "Carbon Steel", "Carbon Steel 45 Degree Elbow"),
  createItem("cs-2", "/images/products/carbon-steel-pipe-fittings/90-elbow-main.webp", "Carbon Steel", "Carbon Steel 90 Degree Elbow"),
  createItem("cs-3", "/images/products/carbon-steel-pipe-fittings/cap-main.webp", "Carbon Steel", "Carbon Steel Cap"),
  createItem("cs-4", "/images/products/carbon-steel-pipe-fittings/EQUAL CROSS-main.webp", "Carbon Steel", "Carbon Steel Equal Cross"),
  createItem("cs-5", "/images/products/carbon-steel-pipe-fittings/EQUALTEE-main.webp", "Carbon Steel", "Carbon Steel Equal Tee"),
  createItem("cs-6", "/images/products/carbon-steel-pipe-fittings/reducer-main.webp", "Carbon Steel", "Carbon Steel Reducer"),
  
  // Duplex Steel
  createItem("ds-1", "/images/products/duplex-pipe-fittings/Duplex Steel 45 Degree Elbow-main.webp", "Duplex Steel", "Duplex Steel 45 Degree Elbow"),
  createItem("ds-2", "/images/products/duplex-pipe-fittings/Duplex Steel 90 Degree Elbow-main.webp", "Duplex Steel", "Duplex Steel 90 Degree Elbow"),
  createItem("ds-3", "/images/products/duplex-pipe-fittings/End Cap-main.webp", "Duplex Steel", "Duplex Steel End Cap"),
  createItem("ds-4", "/images/products/duplex-pipe-fittings/Equal Cross-main.webp", "Duplex Steel", "Duplex Steel Equal Cross"),
  createItem("ds-5", "/images/products/duplex-pipe-fittings/Long Radius Bend-main.webp", "Duplex Steel", "Duplex Steel Long Radius Bend"),
  createItem("ds-6", "/images/products/duplex-pipe-fittings/Straight Tee-main.webp", "Duplex Steel", "Duplex Steel Straight Tee"),

  // Super Duplex
  createItem("sd-1", "/images/products/super-duplex-pipe-fittings/Buttwelding 180 Returns-main.webp", "Super Duplex", "Super Duplex Buttwelding 180 Returns"),
  createItem("sd-2", "/images/products/super-duplex-pipe-fittings/End Cap-main.webp", "Super Duplex", "Super Duplex End Cap"),
  createItem("sd-3", "/images/products/super-duplex-pipe-fittings/Equal Tee-main.webp", "Super Duplex", "Super Duplex Equal Tee"),
  createItem("sd-4", "/images/products/super-duplex-pipe-fittings/Long Radius Bend-main.webp", "Super Duplex", "Super Duplex Long Radius Bend"),
  createItem("sd-5", "/images/products/super-duplex-pipe-fittings/Steel Reducers-main.webp", "Super Duplex", "Super Duplex Steel Reducers"),
  createItem("sd-6", "/images/products/super-duplex-pipe-fittings/Welded Elbows-main.webp", "Super Duplex", "Super Duplex Welded Elbows"),

  // Inconel 625
  createItem("inc-1", "/images/products/inconel-625-pipe-fittings/Alloy 625 Reducer.webp", "Inconel 625", "Inconel 625 Reducer"),
  createItem("inc-2", "/images/products/inconel-625-pipe-fittings/Inconel 625 Bend-main.webp", "Inconel 625", "Inconel 625 Bend"),
  createItem("inc-3", "/images/products/inconel-625-pipe-fittings/Inconel 625 Elbow-main.webp", "Inconel 625", "Inconel 625 Elbow"),
  createItem("inc-4", "/images/products/inconel-625-pipe-fittings/Inconel 625 Stub End-main.webp", "Inconel 625", "Inconel 625 Stub End"),
  createItem("inc-5", "/images/products/inconel-625-pipe-fittings/Inconel Alloy 625 Tee-main.webp", "Inconel 625", "Inconel 625 Tee"),
  createItem("inc-6", "/images/products/inconel-625-pipe-fittings/WERKSTOFF Nr 2.4856 Cap-main.webp", "Inconel 625", "Inconel 625 Cap"),

  // Stainless Steel (Grouping different SS folders)
  createItem("ss-1", "/images/products/stainless-steel-elbow/main-v2.webp", "Stainless Steel", "Stainless Steel Elbow"),
  createItem("ss-2", "/images/products/stainless-steel-elbow/angle-v2.webp", "Stainless Steel", "Stainless Steel Elbow Angle"),
  createItem("ss-3", "/images/products/stainless-steel-reducer/main-v2.webp", "Stainless Steel", "Stainless Steel Reducer"),
  createItem("ss-4", "/images/products/stainless-steel-reducer/angle-v2.webp", "Stainless Steel", "Stainless Steel Reducer Angle"),
  createItem("ss-5", "/images/products/stainless-steel-tee/main-v2.webp", "Stainless Steel", "Stainless Steel Tee"),
  createItem("ss-6", "/images/products/stainless-steel-tee/angle-v2.webp", "Stainless Steel", "Stainless Steel Tee Angle"),
  createItem("ss-7", "/images/products/ss-stub-end/main-v2.webp", "Stainless Steel", "Stainless Steel Stub End"),
  createItem("ss-8", "/images/products/stainless-steel-hex-nipple/main.webp", "Stainless Steel", "Stainless Steel Hex Nipple"),
  createItem("ss-9", "/images/products/stainless-steel-plug/main.webp", "Stainless Steel", "Stainless Steel Plug"),
  createItem("ss-10", "/images/products/stainless-steel-socket/main-v2.webp", "Stainless Steel", "Stainless Steel Socket")
];
