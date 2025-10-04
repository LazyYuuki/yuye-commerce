<script>
  import { Plus, Sparkles, Copy } from 'lucide-svelte';
  import ImageGallery from './ImageGallery.svelte';
  import PriceInfo from './PriceInfo.svelte';
  
  let { 
    formData = $bindable({}),
    onSave,
    onCancel,
    onCopy
  } = $props();

  let currentImageIndex = $state(0);
</script>

<div class="product-form">
  <div class="section">
    <h2 class="section-title">Thông tin chung</h2>
    
    <ImageGallery 
      bind:images={formData.images}
      bind:currentImageIndex={currentImageIndex}
      editable={true}
    />

    <div class="form-fields">
      <div>
        <div class="label">Tên sp *</div>
        <div class="input-wrapper">
          <input
            type="text"
            bind:value={formData.productName}
            placeholder="Nhập tên sản phẩm"
            class="input"
          />
          <button
            onclick={() => onCopy(formData.productName)}
            class="copy-btn"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <div class="label-with-ai">
          <Sparkles class="w-4 h-4 text-blue-500" />
          <span class="label">Tên sản phẩm</span>
          <button class="ai-btn">AI</button>
          <select class="version-select">
            <option>Version cũ</option>
          </select>
        </div>
        <div class="input-wrapper">
          <textarea
            bind:value={formData.productNameAI}
            placeholder="Nhập mô tả AI cho tên sản phẩm"
            class="textarea"
          ></textarea>
          <button
            onclick={() => onCopy(formData.productNameAI)}
            class="copy-btn"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <div class="label-with-ai">
          <span class="label">Mô tả</span>
          <button class="ai-btn">AI</button>
          <select class="version-select">
            <option>Version cũ</option>
          </select>
        </div>
        <div class="input-wrapper">
          <textarea
            bind:value={formData.description}
            placeholder="Nhập mô tả sản phẩm"
            class="textarea tall"
          ></textarea>
          <button
            onclick={() => onCopy(formData.description)}
            class="copy-btn"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Thông tin số liệu</h2>
    
    <PriceInfo 
      bind:price={formData.price}
      bind:cost={formData.cost}
      bind:profit={formData.profit}
      bind:voucher={formData.voucher}
    />
  </div>

  <div class="actions">
    <button
      onclick={onCancel}
      class="cancel-btn"
    >
      Cancel
    </button>
    <button
      onclick={onSave}
      class="save-btn"
    >
      Save
    </button>
  </div>
</div>

<style>
  .product-form {
    max-width: 80rem;
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

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .label-with-ai {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .label-with-ai .label {
    margin-bottom: 0;
  }

  .ai-btn {
    padding: 0.25rem 0.5rem;
    background-color: #3b82f6;
    color: white;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
  }

  .version-select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    font-size: 0.75rem;
    border-radius: 0.25rem;
  }

  .input-wrapper {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    padding-right: 5rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: white;
  }

  .input:focus {
    border-color: #3b82f6;
    outline: none;
  }

  .textarea {
    width: 100%;
    padding: 0.75rem;
    padding-right: 5rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: white;
    min-height: 60px;
    resize: none;
  }

  .textarea.tall {
    min-height: 80px;
    font-size: 0.875rem;
  }

  .textarea:focus {
    border-color: #3b82f6;
    outline: none;
  }

  .copy-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem;
    color: #4b5563;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    background: white;
    cursor: pointer;
  }

  .copy-btn:hover {
    background-color: #f9fafb;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .cancel-btn {
    padding: 0.5rem 1.5rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    font-weight: 500;
    background: white;
    cursor: pointer;
  }

  .cancel-btn:hover {
    background-color: #f9fafb;
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

  .text-blue-500 {
    color: #3b82f6;
  }
</style>
