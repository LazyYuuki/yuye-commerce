<script>
  import ImageGallery from './ImageGallery.svelte';
  import ProductInfo from './ProductInfo.svelte';
  import PriceInfo from './PriceInfo.svelte';
  
  let { 
    product = $bindable(null),
    currentImageIndex = $bindable(0),
    onDelete,
    onSave,
    onCopy
  } = $props();
  let galleryRef;

  $effect(() => {
    galleryRef?.focus?.();
  });
</script>

{#if product}
  <div class="product-editor">
    <div class="actions">
      <button
        onclick={onDelete}
        class="delete-btn"
      >
        Delete
      </button>
      <button
        onclick={onSave}
        class="save-btn"
      >
        Save
      </button>
    </div>

    <div class="section">
      <h2 class="section-title">Thông tin chung</h2>
      
      <ImageGallery 
        bind:images={product.images}
        bind:currentImageIndex={currentImageIndex}
        editable={true}
        bind:this={galleryRef}
      />

      <ProductInfo 
        bind:productName={product.productName}
        bind:productNameAI={product.productNameAI}
        bind:description={product.description}
        onCopy={onCopy}
      />
    </div>

    <div class="section">
      <h2 class="section-title">Thông tin số liệu</h2>
      
      <PriceInfo 
        bind:price={product.price}
        bind:cost={product.cost}
        bind:profit={product.profit}
        bind:voucher={product.voucher}
      />
    </div>
  </div>
{/if}

<style>
  .product-editor {
    max-width: 80rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .delete-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid #ef4444;
    color: #ef4444;
    border-radius: 0.5rem;
    font-weight: 500;
    background: white;
    cursor: pointer;
  }

  .delete-btn:hover {
    background-color: #fef2f2;
  }

  .save-btn {
    padding: 0.5rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
  }

  .save-btn:hover {
    background-color: #1d4ed8;
  }

  .section {
    background-color: #fef3c7;
    border: 2px solid #fbbf24;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }
</style>
