<template>
  <div class="main-container">
    <LeftBar/>
    <div class="main-right">
      <Navbar/>
      <Main/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
  import LeftBar from './components/LeftBar';
  import Main from './components/Main';

  export default {
    name: 'LayOut',
    components: {
      Navbar,
      LeftBar,
      Main
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .main-container {
    display: flex;
    height: 100vh;
    .main-right {
      display: flex;
      flex-direction: column;
      flex: 15;
    }
  }
</style>
