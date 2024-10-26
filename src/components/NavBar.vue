<template>
    <header>
      <div class="nav">
        <RouterLink to="/">Add Todo</RouterLink>
        <RouterLink :to="{name:'list'}">List</RouterLink>
        <RouterLink to="/add">Add</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    
  </header>
</template>
<style >
.nav{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-color: darkslategray;
  justify-content: space-between;
  display: flex;
  justify-items: center;

}
</style>