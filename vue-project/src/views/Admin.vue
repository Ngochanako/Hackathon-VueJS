<template>
   <div style="display: flex;">
      <div class="header-left">
            <RouterLink class="header-item" to="/admin/dashboard" exact-active-class="active">Dashboard</RouterLink>
            <RouterLink class="header-item" to="/admin/manage-category" exact-active-class="active">Manager Category</RouterLink>
            <RouterLink class="header-item" to="/admin/manage-product" exact-active-class="active">Manager Product</RouterLink>
        </div>
      <RouterView></RouterView>
    </div>
</template>

<script setup>

</script>

<style scoped>
.header-left{
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    min-height: 800px;
    min-width: 200px;
}
.active{
    background-color:gray;
    padding: 5px;
    border-radius: 5px;
}
.header-item{
    text-decoration: none;
    color: white;
}
</style>