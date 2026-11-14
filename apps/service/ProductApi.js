const DUMMY_JSON_URL = "https://dummyjson.com/products?limit=200";
const PLATZI_URL = "https://api.escuelajs.co/api/v1/products?offset=0&limit=200";
const FAKE_STORE_URL = "https://fakestoreapi.com/products";

const CATEGORIES = ["electronics", "fashion", "home", "sports", "beauty", "grocery"];

const normalizeDummyProduct = (item, index) => ({
  id: `dummy-${item.id ?? index + 1}`,
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category,
  image: item.thumbnail || item.images?.[0] || "",
  rating: {
    rate: item.rating ?? 0,
    count: item.stock ?? 0,
  },
});

const normalizePlatziProduct = (item, index) => ({
  id: `platzi-${item.id ?? index + 1}`,
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category?.name || item.category || "general",
  image: Array.isArray(item.images) ? item.images[0] : item.images || "",
  rating: {
    rate: 4,
    count: 0,
  },
});

const normalizeFakeStoreProduct = (item) => ({
  id: `fakestore-${item.id}`,
  title: item.title,
  price: item.price,
  description: item.description,
  category: item.category,
  image: item.image,
  rating: item.rating || { rate: 0, count: 0 },
});

const uniqueByTitle = (products) => {
  const seen = new Set();
  return products.filter((product) => {
    const key = String(product.title || "").trim().toLowerCase();
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const createGeneratedProducts = (count, startAt = 1) =>
  Array.from({ length: count }, (_, index) => {
    const id = startAt + index;
    return {
      id: `generated-${id}`,
      title: `Marketplace Item ${id}`,
      price: Number((8 + (id % 90) + (id % 7) / 10).toFixed(2)),
      description: `Unique catalog item #${id} for browsing and cart testing.`,
      category: CATEGORIES[id % CATEGORIES.length],
      image: `https://picsum.photos/seed/market${id}/400/400`,
      rating: {
        rate: Number((3 + (id % 20) / 10).toFixed(1)),
        count: 20 + id,
      },
    };
  });

export const FALLBACK_PRODUCTS = createGeneratedProducts(120, 1);

const ensureMinProducts = (products, minCount) => {
  const unique = uniqueByTitle(products);
  if (unique.length >= minCount) {
    return unique;
  }
  const generated = createGeneratedProducts(minCount - unique.length, unique.length + 1);
  return uniqueByTitle([...unique, ...generated]);
};

async function fetchJson(url, signal) {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

export async function fetchProducts({ timeoutMs = 20000, minCount = 120 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const settled = await Promise.allSettled([
      fetchJson(DUMMY_JSON_URL, controller.signal),
      fetchJson(PLATZI_URL, controller.signal),
      fetchJson(FAKE_STORE_URL, controller.signal),
    ]);

    let products = [];
    const sources = [];

    if (settled[0].status === "fulfilled") {
      products = products.concat((settled[0].value.products || []).map(normalizeDummyProduct));
      sources.push("dummyjson");
    }

    if (settled[1].status === "fulfilled") {
      const platziList = Array.isArray(settled[1].value) ? settled[1].value : [];
      products = products.concat(platziList.map(normalizePlatziProduct));
      sources.push("platzi");
    }

    if (settled[2].status === "fulfilled") {
      const fakeList = Array.isArray(settled[2].value) ? settled[2].value : [];
      products = products.concat(fakeList.map(normalizeFakeStoreProduct));
      sources.push("fakestore");
    }

    products = ensureMinProducts(products, minCount);

    if (products.length === 0) {
      throw new Error("Empty product list");
    }

    return {
      products,
      fromCache: false,
      source: sources.join("+") || "generated",
      count: products.length,
    };
  } finally {
    clearTimeout(timer);
  }
}
