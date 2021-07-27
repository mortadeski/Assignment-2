<template>
  <div id="app">
    <ul id="nav">
      <router-link to="/white">White</router-link> |
      <router-link to="/blue">Blue</router-link>
    </ul>
    <!--  Vue Router does not notice any change if the same component is being addressed. With the key, any change to the path will trigger a reload of the component with the new data. -->
    <router-view :key="$route.fullPath"></router-view > 
    <br/>
  </div>
</template>

<style>
#app {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background-color: cadetblue;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: black;
}
</style>
