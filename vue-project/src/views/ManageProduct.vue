<template>
    <div style="min-width: 1000px;">
      <div>
        <div class="m-auto mt-4 h-[100vh]">
          <div class="main">
            <header class="d-flex justify-content-between mb-3">
              <h3>Product</h3>
              <button @click="handleFormEdit" class="btn btn-primary">Add new product</button>
            </header>
            <div class="d-flex align-items-center justify-content-end gap-2 mb-3">
              <input
                style="width: 350px"
                type="text"
                class="form-control"
                placeholder="Tìm kiếm theo tên"
                v-model="valueSearch"
              />
              <i @click="searchName" class="fa-solid fa-arrows-rotate" title="Refresh"></i>
            </div>
            <table class="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(btn, index) in products" :key="btn.id">
                  <td>{{ index + 1 }}</td>
                  <td><img :src="btn.image" alt="" style="width: 100px;height: 100px;border-radius: 5px;" /></td>
                  <td>{{ btn.name }}</td>
                  <td>{{ btn.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) }}</td>
                  <td>{{ btn.quantity }}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px">
                      <span @click="editProduct(btn.id)" class="button button-edit">Sửa</span>
                      <span @click="deleteProduct(btn.id)" class="button button-delete">Xóa</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Form thêm mới -->
          <ModalAddVue
            :product="product"
            :show-modal-edit="showModalEdit"
            :type-submit="typeSubmit"
            :close-modal-edit="closeModalEdit"
            :validate-name="validateName"
            @message-add-product="addProduct"
          />
          <!-- Modal xác nhận xóa tài khoản -->
          <div class="overlay" v-if="showModalDelete">
            <div class="modal-custom">
              <div class="modal-title">
                <h4>Cảnh báo</h4>
                <i @click="cancelDelete" class="fa-solid fa-xmark"></i>
              </div>
              <div class="modal-body-custom">
                <span>Bạn có chắc chắn muốn xóa sản phẩm này?</span>
              </div>
              <div class="modal-footer-custom">
                <button @click="cancelDelete" class="btn btn-light">Hủy</button>
                <button @click="confirmDelete" class="btn btn-danger">Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import ModalAddVue from '../components/ModalAdd.vue';
  
  // Initialize
  const products = reactive([]); 
  const showModalEdit = ref(false);
  const showModalDelete = ref(false);
  const typeSubmit = ref('add'); 
  const validateName = ref(false);
  const valueSearch = ref(''); 
  
  const product = reactive({
    id: '',
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    status: true,
  });
  
  // Get Products on mount
  const fetchProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    products.length = 0; 
    products.push(...storedProducts); 
  };
  
  onMounted(fetchProducts);
  
  // Function to reset product form
  const resetProduct = () => {
    product.id = '';
    product.name = '';
    product.image = '';
    product.price = 0;
    product.quantity = 0;
    product.status = true;
  };
  
  // Click button to add new product
  const handleFormEdit = () => {
    typeSubmit.value = 'add'; 
    resetProduct(); 
    showModalEdit.value = true;
  };
  
  // Click button to edit product
  const editProduct = (id) => {
    const productEdit = products.find((u) => u.id === id);
    if (productEdit) {
      Object.assign(product, productEdit); 
      typeSubmit.value = 'edit'; 
      showModalEdit.value = true;
    }
  };
  
  // Close modal edit
  const closeModalEdit = () => {
    showModalEdit.value = false;
    resetProduct();
  };
  
  // Add new product
  const addProduct = (newProduct) => {
    // Validate Name
    if (products.some((p) => p.name.toLowerCase() === newProduct.name.toLowerCase())) {
      validateName.value = true;
      return;
    }
  
    if (typeSubmit.value === 'add') {
      newProduct.id = new Date().getTime(); 
      products.push({ ...newProduct }); 
    } else {
      const index = products.findIndex((u) => u.id === newProduct.id);
      if (index !== -1) {
        products[index] = { ...newProduct }; 
      }
    }
  
    localStorage.setItem('products', JSON.stringify(products)); 
    resetProduct(); 
    showModalEdit.value = false; 
  };
  
  // Delete product
  const deleteProduct = (id) => {
    showModalDelete.value = true;
    product.id = id; // Set the product ID to be deleted
  };
  
  const cancelDelete = () => {
    showModalDelete.value = false;
    product.id = '';
  };
  
  const confirmDelete = () => {
    const index = products.findIndex((u) => u.id === product.id);
    if (index !== -1) {
      products.splice(index, 1); 
      localStorage.setItem('products', JSON.stringify(products));
    }
    showModalDelete.value = false;
    product.id = ''; 
  };
  
  // Search by name product
  const searchName = () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (valueSearch.value.trim() !== '') {
      const filteredProducts = allProducts.filter((u) =>
        u.name.toLowerCase().includes(valueSearch.value.toLowerCase())
      );
      products.length = 0; 
      products.push(...filteredProducts); 
    } else {
      fetchProducts(); 
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  