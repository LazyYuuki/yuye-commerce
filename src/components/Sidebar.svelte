<script>
  import { Search, Plus } from "lucide-svelte";

  let {
    products = [],
    selectedProduct = null,
    searchTerm = $bindable(""),
    showSearch = $bindable(false),
    onSelectProduct,
    onAddClick,
  } = $props();

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const filteredProducts = $derived.by(() => {
    return products.filter((product) => {
      const searchNormalized = removeAccents(searchTerm);
      const productNameNormalized = removeAccents(product.productName || "");
      return productNameNormalized.includes(searchNormalized);
    });
  });
</script>

<div class="sidebar">
  {#if !showSearch}
    <button onclick={() => (showSearch = true)} class="search-btn">
      <Search class="w-4 h-4" />
      Search
    </button>
  {:else}
    <div class="search-input-wrapper">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search products..."
        onblur={() => !searchTerm && (showSearch = false)}
        class="search-input"
      />
      {#if searchTerm}
        <button
          onclick={() => {
            searchTerm = "";
            showSearch = false;
          }}
          class="clear-btn"
        >
          ✕
        </button>
      {/if}
    </div>
  {/if}

  <button onclick={onAddClick} class="add-btn">
    <Plus class="w-4 h-4" />
    Add
  </button>

  <div class="product-list">
    {#each filteredProducts as product (product.id)}
      <button
        onclick={() => onSelectProduct(product)}
        class={`product-item ${selectedProduct?.id === product.id ? "selected" : ""}`}
      >
        {product.productName}
      </button>
    {/each}
  </div>
</div>

<style>
  .sidebar {
    width: 12rem;
    background-color: white;
    border-right: 1px solid #d1d5db;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .search-btn {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid #1f2937;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: white;
    cursor: pointer;
  }

  .search-btn:hover {
    background-color: #f3f4f6;
  }

  .search-input-wrapper {
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px solid #3b82f6;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  .search-input:focus {
    outline: none;
  }

  .clear-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
  }

  .clear-btn:hover {
    color: #4b5563;
  }

  .add-btn {
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
  }

  .add-btn:hover {
    background-color: #1d4ed8;
  }

  .product-list {
    margin-top: 1rem;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .product-item {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    background-color: white;
    border: 2px solid #fca5a5;
    cursor: pointer;
  }

  .product-item:hover {
    background-color: #fef2f2;
  }

  .product-item.selected {
    background-color: #bbf7d0;
    border-color: #4ade80;
  }

  .footer {
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .mt-1 {
    margin-top: 0.25rem;
  }
</style>
