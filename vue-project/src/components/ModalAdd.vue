<template>
   <!-- Form thêm mới -->
   <div class="overlay" v-show="showModalEdit">
      <form class="form" @submit.prevent="addProduct">
        <div class="d-flex justify-content-between align-items-center">
          <h4>{{typeSubmit=='add'?'Add New Product':'Edit Product'}}</h4>
          <i @click="closeModalEdit" class="fa-solid fa-xmark"></i>
        </div>
        <div>
          <label class="form-label" for="userName">Name</label>
          <input id="userName" type="text" class="form-control" required v-model="product.name"/>
        </div>
        <!-- Tên không được phép trùng -->
         <div v-if="validateName" style="color: red; font-weight: 600; font-size: 12px;">
           Tên không được phép trùng
         </div>
        <div>
          <label class="form-label" for="dateOfBirth">Image</label>
          <input id="dateOfBirth" type="text" class="form-control" required v-model="product.image" />
        </div>
        
        <div>
          <label class="form-label" for="email">Price</label>
          <input min="10000" id="email" type="number" class="form-control" required v-model="product.price" />
        </div>
       
        <div>
          <label class="form-label" for="email">Quantity</label>
          <input min="1" max="100" id="email" type="number" class="form-control" required v-model="product.quantity" />
        </div>
        <div>
          <button type="submit" class="w-100 btn btn-primary">{{typeSubmit=='add'?'Thêm mới':'Chỉnh sửa'}}</button>
        </div>
      </form>
    </div>
</template>

<script setup>
const props=defineProps(['product','showModalEdit','typeSubmit','closeModalEdit','validateName']);
const emit=defineEmits(['messageAddProduct']);
const addProduct=()=>{
    emit('messageAddProduct',{...props.product});
}

</script>

<style>

</style>