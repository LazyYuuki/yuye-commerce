<script>
  let { 
    price = $bindable(0),
    cost = $bindable(0),
    profit = $bindable(0),
    voucher = $bindable(0)
  } = $props();
</script>

<div class="price-info">
  <div class="grid">
    <div>
      <div class="label">Giá sỉ</div>
      <input
        type="number"
        bind:value={price}
        class="input"
      />
    </div>
    <div>
      <div class="label">Voucher</div>
      <input
        type="number"
        bind:value={voucher}
        class="input"
      />
    </div>
    <div>
      <div class="label">Giá bán</div>
      <input
        type="number"
        bind:value={cost}
        class="input"
      />
    </div>
    <div class="empty"></div>
    <div>
      <div class="label">Lợi nhuận</div>
      <input
        type="number"
        bind:value={profit}
        class="input"
      />
    </div>
  </div>
</div>

<style>
  .price-info {
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .empty {
    grid-row: span 2;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: white;
  }

  .input:focus {
    border-color: #3b82f6;
    outline: none;
  }
</style>
