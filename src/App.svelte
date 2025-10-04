<script>
  import Sidebar from './components/Sidebar.svelte';
  import ProductEditor from './components/ProductEditor.svelte';
  import ProductForm from './components/ProductForm.svelte';
  import { productStore } from './stores/productStore.svelte.js';
  
  let searchTerm = $state('');
  let showAddForm = $state(false);
  let showSearch = $state(false);
  let selectedPlatform = $state('All');
  let currentImageIndex = $state(0);
  let editingProduct = $state(null);
  let formData = $state({
    images: [''],
    productName: '',
    productNameAI: '',
    description: '',
    price: '',
    cost: '',
    profit: '',
    voucher: '',
    platform: 'TikTok',
    versions: []
  });

  const filteredProducts = $derived.by(() => {
    return productStore.products.filter(product => {
      const matchesPlatform = selectedPlatform === 'All' || product.platform === selectedPlatform;
      return matchesPlatform;
    });
  });

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function handleSelectProduct(product) {
    productStore.selectProduct(product);
    editingProduct = JSON.parse(JSON.stringify(product));
    currentImageIndex = 0;
    showAddForm = false;
  }

  function handleAddClick() {
    showAddForm = true;
    formData = {
      images: [],
      productName: '',
      productNameAI: '',
      description: '',
      price: '',
      cost: '',
      profit: '',
      voucher: '',
      platform: 'TikTok',
      versions: []
    };
  }

  function handleSaveProduct() {
    if (formData.productName) {
      productStore.addProduct({
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/300x300?text=No+Image'],
        productName: formData.productName,
        productNameAI: formData.productNameAI,
        description: formData.description,
        price: formData.price,
        cost: formData.cost,
        profit: formData.profit,
        voucher: formData.voucher,
        platform: formData.platform,
        versions: formData.versions
      });
      showAddForm = false;
    } else {
      alert('Please fill in the product name (Tên sp)');
    }
  }

  function handleCancelAdd() {
    showAddForm = false;
    if (productStore.products.length > 0 && !productStore.selectedProduct) {
      productStore.selectProduct(productStore.products[0]);
    }
  }

  function handleDeleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      productStore.deleteProduct(editingProduct.id);
      editingProduct = null;
    }
  }

  function handleSaveEdit() {
    if (editingProduct.productName) {
      productStore.updateProduct(editingProduct.id, editingProduct);
    } else {
      alert('Please fill in the product name (Tên sp)');
    }
  }
</script>

<div class="app">
  <Sidebar 
    products={filteredProducts}
    selectedProduct={productStore.selectedProduct}
    bind:searchTerm={searchTerm}
    bind:showSearch={showSearch}
    onSelectProduct={handleSelectProduct}
    onAddClick={handleAddClick}
  />

  <div class="main-content">
    <div class="platform-filter">
      <select
        bind:value={selectedPlatform}
        class="platform-select"
      >
        <option>All</option>
        <option>TikTok</option>
        <option>Shopee</option>
      </select>
    </div>

    {#if editingProduct && !showAddForm}
      <ProductEditor 
        bind:product={editingProduct}
        bind:currentImageIndex={currentImageIndex}
        onDelete={handleDeleteProduct}
        onSave={handleSaveEdit}
        onCopy={copyToClipboard}
      />
    {/if}

    {#if showAddForm}
      <ProductForm 
        bind:formData={formData}
        onSave={handleSaveProduct}
        onCancel={handleCancelAdd}
        onCopy={copyToClipboard}
      />
    {/if}

    {#if !showAddForm && productStore.products.length === 0}
      <div class="empty-state">
        <div class="empty-content">
          <p class="empty-title">No products yet</p>
          <p class="empty-subtitle">Click Add to create your first product</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  .app {
    display: flex;
    height: 100vh;
    background-color: #f9fafb;
  }

  .main-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .platform-filter {
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  .platform-select {
    padding: 0.5rem 1rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    font-weight: 500;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6b7280;
  }

  .empty-content {
    text-align: center;
  }

  .empty-title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .empty-subtitle {
    font-size: 0.875rem;
  }
</style>
