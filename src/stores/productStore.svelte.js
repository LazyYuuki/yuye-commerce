const MOCK_PRODUCTS = [
  {
    id: 1,
    images: ["https://via.placeholder.com/300x300?text=Serum+1", "https://via.placeholder.com/300x300?text=Serum+2", "https://via.placeholder.com/300x300?text=Serum+3"],
    productName: "Serum Torriden DIVE-IN Low Molecular Hyaluronic Acid",
    productNameAI: "Serum dưỡng ẩm Torriden DIVE-IN với Hyaluronic Acid phân tử thấp giúp cấp ẩm sâu cho da",
    description: "Serum dưỡng ẩm cao cấp từ Hàn Quốc với công nghệ Hyaluronic Acid phân tử thấp, thẩm thấu sâu vào da, cấp ẩm tức thì và lâu dài. Phù hợp cho mọi loại da.",
    price: 60000,
    cost: 120000,
    profit: 30000,
    voucher: 5000,
    platform: "TikTok",
    versions: ["30ml", "50ml", "100ml"]
  },
  {
    id: 2,
    images: ["https://via.placeholder.com/300x300?text=Anessa"],
    productName: "Anessa Perfect UV Sunscreen Skincare Milk SPF50+",
    productNameAI: "Kem chống nắng Anessa Perfect UV SPF50+ chống nước, bảo vệ da hoàn hảo",
    description: "Kem chống nắng số 1 Nhật Bản, chống nước tuyệt đối, bảo vệ da khỏi tia UV, phù hợp cho hoạt động ngoài trời.",
    price: 85000,
    cost: 150000,
    profit: 45000,
    voucher: 10000,
    platform: "Shopee",
    versions: ["60ml"]
  },
  {
    id: 3,
    images: ["https://via.placeholder.com/300x300?text=Mediheal"],
    productName: "Mediheal N.M.F Intensive Hydrating Mask",
    productNameAI: "Mặt nạ dưỡng ẩm chuyên sâu Mediheal N.M.F cho da căng mịn",
    description: "Mặt nạ giấy cao cấp từ Hàn Quốc với công thức N.M.F giúp cấp ẩm chuyên sâu, phục hồi da mệt mỏi.",
    price: 45000,
    cost: 80000,
    profit: 25000,
    voucher: 3000,
    platform: "TikTok",
    versions: ["1 miếng", "Hộp 10 miếng"]
  },
  {
    id: 4,
    images: ["https://via.placeholder.com/300x300?text=Bioderma"],
    productName: "Bioderma Sensibio H2O Micellar Water",
    productNameAI: "Nước tẩy trang Bioderma Sensibio H2O dịu nhẹ cho da nhạy cảm",
    description: "Nước tẩy trang micellar từ Pháp, dịu nhẹ làm sạch sâu mà không gây kích ứng, phù hợp cho da nhạy cảm.",
    price: 95000,
    cost: 180000,
    profit: 55000,
    voucher: 8000,
    platform: "Shopee",
    versions: ["250ml", "500ml"]
  },
  {
    id: 5,
    images: ["https://via.placeholder.com/300x300?text=CeraVe"],
    productName: "CeraVe Foaming Facial Cleanser",
    productNameAI: "Sữa rửa mặt tạo bọt CeraVe làm sạch sâu với ceramides",
    description: "Sữa rửa mặt từ Mỹ với ceramides và hyaluronic acid, làm sạch sâu nhưng vẫn duy trì độ ẩm cho da.",
    price: 72000,
    cost: 135000,
    profit: 38000,
    voucher: 6000,
    platform: "TikTok",
    versions: ["237ml", "473ml"]
  },
  {
    id: 6,
    images: ["https://via.placeholder.com/300x300?text=Some+By+Mi"],
    productName: "Some By Mi AHA BHA PHA 30 Days Miracle Serum",
    productNameAI: "Tinh chất trị mụn Some By Mi AHA BHA PHA 30 ngày kỳ diệu",
    description: "Tinh chất trị mụn hiệu quả với AHA, BHA, PHA giúp làm sạch lỗ chân lông, cải thiện mụn chỉ sau 30 ngày.",
    price: 68000,
    cost: 125000,
    profit: 35000,
    voucher: 7000,
    platform: "Shopee",
    versions: ["50ml"]
  }
];

class ProductStore {
  products = $state([...MOCK_PRODUCTS]);
  selectedProduct = $state(MOCK_PRODUCTS[0]);

  addProduct(product) {
    const newProduct = {
      ...product,
      id: this.products.length + 1,
      price: Number.parseFloat(product.price) || 0,
      cost: Number.parseFloat(product.cost) || 0,
      profit: Number.parseFloat(product.profit) || 0,
      voucher: Number.parseFloat(product.voucher) || 0
    };
    this.products = [...this.products, newProduct];
    this.selectedProduct = newProduct;
    return newProduct;
  }

  updateProduct(id, updates) {
    const updatedProduct = {
      ...updates,
      id,
      price: Number.parseFloat(updates.price) || 0,
      cost: Number.parseFloat(updates.cost) || 0,
      profit: Number.parseFloat(updates.profit) || 0,
      voucher: Number.parseFloat(updates.voucher) || 0
    };
    this.products = this.products.map(p => p.id === id ? updatedProduct : p);
    if (this.selectedProduct?.id === id) {
      this.selectedProduct = updatedProduct;
    }
    return updatedProduct;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    if (this.selectedProduct?.id === id) {
      this.selectedProduct = this.products.length > 0 ? this.products[0] : null;
    }
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }
}

export const productStore = new ProductStore();
