<script>
  import { Plus, X } from 'lucide-svelte';
  import { tick } from 'svelte';
  
  let { 
    images = $bindable([]),
    currentImageIndex = $bindable(0),
    editable = false
  } = $props();

  let fileInput;
  let container;

  async function handleFileSelect(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let added = false;
    for (const file of files) {
      if (images.length >= 9) break;
      const dataUrl = await fileToDataUrl(file);
      images = [...images, dataUrl];
      added = true;
    }
    if (added && openAddModal && !keepOpenAfterAdd) {
      openAddModal = false;
      showToast('Image added');
    } else if (added) {
      showToast('Image added');
    }
  }

  function handleRemoveImage(index) {
    images = images.filter((_, i) => i !== index);
    if (currentImageIndex >= images.length && images.length > 0) {
      currentImageIndex = images.length - 1;
    } else if (images.length === 0) {
      currentImageIndex = 0;
    }
  }

  let openAddModal = $state(false);
  let keepOpenAfterAdd = $state(false);
  let toastMsg = $state('');
  let toastTimer;

  async function handleAddClick() {
    if (!editable) return;
    openAddModal = true;
    await tick();
    const drop = document.querySelector('.add-modal .dropzone');
    drop?.focus();
  }

  function showToast(msg) {
    toastMsg = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg = '';
    }, 1500);
  }

  async function handlePaste(event) {
    if (!editable) return;
    const items = event.clipboardData?.items || [];
    let added = false;
    for (const item of items) {
      if (images.length >= 9) break;
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (!file) continue;
        const dataUrl = await fileToDataUrl(file);
        images = [...images, dataUrl];
        added = true;
      }
    }
    if (added && openAddModal && !keepOpenAfterAdd) {
      openAddModal = false;
      showToast('Image added');
    } else if (added) {
      showToast('Image added');
    }
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function handleDrop(e) {
    preventDefaults(e);
    const files = e.dataTransfer?.files || [];
    if (!files.length) return;
    let added = false;
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      if (images.length >= 9) break;
      const dataUrl = await fileToDataUrl(file);
      images = [...images, dataUrl];
      added = true;
    }
    if (added && openAddModal && !keepOpenAfterAdd) {
      openAddModal = false;
      showToast('Image added');
    } else if (added) {
      showToast('Image added');
    }
  }

  function handleDragOver(e) { preventDefaults(e); }
  function handleDragEnter(e) { preventDefaults(e); }
  function handleDragLeave(e) { preventDefaults(e); }
</script>

<div class="image-gallery" bind:this={container} onpaste={handlePaste} tabindex={editable ? 0 : undefined}>
  <div class="text-sm font-medium mb-2">Hình ảnh</div>
  <div class="gallery-container">
    <div class="main-image">
      {#if images.length > 0}
        <img 
          src={images[currentImageIndex]} 
          alt="Product" 
          class="image"
        />
      {:else}
        <div class="no-image">No Image</div>
      {/if}
    </div>
    
    <div class="thumbnails">
      {#each images as img, idx}
        <div class="thumbnail-wrapper">
          <button
            onclick={() => currentImageIndex = idx}
            class={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`}
              class="thumbnail-img"
            />
          </button>
          {#if editable}
            <button
              onclick={() => handleRemoveImage(idx)}
              class="remove-btn"
              title="Remove image"
            >
              <X class="w-3 h-3" />
            </button>
          {/if}
        </div>
      {/each}
      {#if images.length < 9 && editable}
        <button class="thumbnail add-thumbnail" onclick={handleAddClick}>
          <Plus class="w-5 h-5" />
        </button>
      {/if}
    </div>
    <div class="hint">
      {#if editable}
        Click + to add, or select the gallery and paste (Cmd/Ctrl+V)
      {:else}
        Tối đa 9 ảnh, slide
      {/if}
    </div>
  </div>

  <input
    type="file"
    bind:this={fileInput}
    onchange={handleFileSelect}
    accept="image/*"
    multiple
    class="file-input"
  />

  {#if openAddModal}
    <div class="add-modal" onpaste={(e) => { e.preventDefault(); e.stopPropagation(); handlePaste(e); }}>
      <div class="backdrop" onclick={() => openAddModal = false}></div>
      <div class="panel" role="dialog" aria-modal="true" onkeydown={(e) => {
        if (e.key === 'Escape') { e.preventDefault(); openAddModal = false; }
      }}>
        <div class="header">
          <div class="title">Add image</div>
          <button class="close" onclick={() => openAddModal = false} aria-label="Close"><X class="w-4 h-4" /></button>
        </div>
        <div 
          class="dropzone" 
          tabindex="0" 
          onclick={() => fileInput?.click()}
          ondragover={handleDragOver}
          ondragenter={handleDragEnter}
          ondragleave={handleDragLeave}
          ondrop={handleDrop}
        >
          <div class="dz-text">
            Click to upload, paste here (Cmd/Ctrl+V), or drop images
          </div>
          <label class="keep-open"><input type="checkbox" bind:checked={keepOpenAfterAdd} /> Add more</label>
        </div>
        <div class="actions">
          <button class="btn" onclick={() => openAddModal = false}>Done</button>
        </div>
      </div>
    </div>
  {/if}

  {#if toastMsg}
    <div class="toast">{toastMsg}</div>
  {/if}
</div>

<style>
  .image-gallery {
    margin-bottom: 1.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .gallery-container {
    width: 100%;
    max-width: 42rem;
    margin: 0 auto;
  }

  .main-image {
    width: 100%;
    height: 24rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: white;
    margin-bottom: 0.75rem;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
  }

  .thumbnails {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .thumbnail-wrapper {
    position: relative;
  }

  .thumbnail {
    width: 4rem;
    height: 4rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
    cursor: pointer;
    padding: 0;
  }

  .thumbnail.active {
    border-color: #3b82f6;
  }

  .thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .add-thumbnail {
    border-style: dashed;
    border-color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
  }

  .add-thumbnail:hover {
    background-color: #f9fafb;
  }

  .remove-btn {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .remove-btn:hover {
    background-color: #dc2626;
  }

  .hint {
    font-size: 0.75rem;
    color: #4b5563;
    margin-top: 0.5rem;
    text-align: center;
  }

  .file-input {
    display: none;
  }
  .add-modal {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    z-index: 50;
  }
  .add-modal .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
  }
  .add-modal .panel {
    position: relative;
    background: white;
    border-radius: 0.5rem;
    width: 32rem;
    max-width: calc(100% - 2rem);
    border: 1px solid #e5e7eb;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    padding: 1rem;
    z-index: 1;
  }
  .add-modal .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .add-modal .title { font-weight: 600; }
  .add-modal .close {
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 0.25rem;
    cursor: pointer;
  }
  .add-modal .dropzone {
    border: 2px dashed #9ca3af;
    border-radius: 0.5rem;
    min-height: 10rem;
    display: grid;
    place-items: center;
    color: #6b7280;
    outline: none;
    cursor: pointer;
  }
  .add-modal .dropzone:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
  .add-modal .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.75rem;
  }
  .add-modal .btn {
    padding: 0.5rem 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .keep-open {
    margin-top: 0.5rem;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    color: #374151;
  }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    background: rgba(17,24,39,0.9);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    z-index: 60;
  }
</style>
