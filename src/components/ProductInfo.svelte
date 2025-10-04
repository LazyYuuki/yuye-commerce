<script>
  import { Sparkles, Copy } from 'lucide-svelte';
  
  let { 
    productName = $bindable(''),
    productNameAI = $bindable(''),
    description = $bindable(''),
    onCopy
  } = $props();
</script>

<div class="product-info">
  <div class="grid">
    <div>
      <div class="label">Tên sp (Raw Input)</div>
      <div class="input-wrapper">
        <textarea
          bind:value={productName}
          class="textarea"
        ></textarea>
        <button
          onclick={() => onCopy(productName)}
          class="copy-btn"
        >
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div>
      <div class="label-with-ai">
        <Sparkles class="w-4 h-4 text-blue-500" />
        <span class="label">Tên sản phẩm (AI Generated)</span>
        <button class="ai-btn">AI</button>
        <select class="version-select">
          <option>Version cũ</option>
        </select>
      </div>
      <div class="input-wrapper">
        <textarea
          bind:value={productNameAI}
          class="textarea"
        ></textarea>
        <button
          onclick={() => onCopy(productNameAI)}
          class="copy-btn"
        >
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  <div class="grid mt-4">
    <div>
      <div class="label">Mô tả (Raw Input)</div>
      <div class="input-wrapper">
        <textarea
          bind:value={description}
          class="textarea tall"
        ></textarea>
        <button
          onclick={() => onCopy(description)}
          class="copy-btn"
        >
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div>
      <div class="label-with-ai">
        <Sparkles class="w-4 h-4 text-blue-500 mt-1" />
        <span class="label">Mô tả (AI Generated)</span>
        <button class="ai-btn">AI</button>
        <select class="version-select">
          <option>Version cũ</option>
        </select>
      </div>
      <div class="input-wrapper">
        <textarea
          bind:value={description}
          class="textarea tall"
        ></textarea>
        <button
          onclick={() => onCopy(description)}
          class="copy-btn"
        >
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .product-info {
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .mt-4 {
    margin-top: 1rem;
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
    min-height: 120px;
    font-size: 0.875rem;
  }

  .textarea:focus {
    border-color: #3b82f6;
    outline: none;
  }

  .copy-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
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

  .text-blue-500 {
    color: #3b82f6;
  }

  .mt-1 {
    margin-top: 0.25rem;
  }
</style>
