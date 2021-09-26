<template>
  <div class="header">
    <div class="logo">
      <nuxt-link to="/"> Cathleen Owens </nuxt-link>
    </div>

    <!-- <div class="menu">
      <img src="/Menu.svg" alt="" srcset="">
    </div> -->
  </div>
</template>

<script>
export default {}
</script>

<style>
.menu img {
  width: 33px;
  height: 15px;
}

.menu {
  cursor: pointer;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header a {
  text-decoration: none;
}
</style>
