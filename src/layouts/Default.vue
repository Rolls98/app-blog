<template>
  <div class="LayoutDefault">
    <nav class="navigation navbar navbar-expand-lg bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="material-icons-outlined">menu</span>
        </button>
        <div id="navbarTogglerDemo02" class="collapse navbar-collapse">
          <ul class="navbar-nav menu">
            <li class="nav-item">
              <router-link class="nav-link" to="/"> Accueil </router-link>
              <!-- <a
                class="nav-link active"
                aria-current="page"
                href="index.html"
              >Accueil</a> -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Blog"> Blog </router-link>
              <!-- <a
                class="nav-link"
                href="blog.html"
              >Blog</a> -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Videos"> Vidéos </router-link>
              <!-- <a
                class="nav-link"
                href="video.html"
              >Vidéos</a> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- header -->
    <header class="header">
      <div class="h-text">
        <h2>Bienvenue sur notre blog</h2>
        <p>Decouvrez tout nos articles sur les secrets de vie</p>
        <a href="blog"><button class="h-btn">à découvrir</button></a>
      </div>
    </header>
    <div>
      <slot />
    </div>
    <footer class="footer">
      <p style="text-align: center">
        <span>Tous droits réservés ©</span>
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      navBarHeight: "90",
    };
  },
};
</script>

<style>
</style>