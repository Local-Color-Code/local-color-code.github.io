<template>
  <div id="app" class="container-fluid">
    <div class="card">
      <div class="card-header bg-dark text-white">
        <h1>Local Color Code</h1>
        <h2>Local minority owned businesses and other relevant social commentary</h2>
      </div>
      <div class="card-body">
        <h4>716 Black Businesses</h4>
        <h5>Buffalo, Niagara Falls, and the surrounding area</h5>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <fetch-data></fetch-data>
      </div>
    </div>
  </div>
</template>

<script>import FetchData from './fetch-data'

    export default {
      components: {
        'fetch-data': FetchData
      },

      data () {
        return {}
      }
    }</script>

<style>

</style>
