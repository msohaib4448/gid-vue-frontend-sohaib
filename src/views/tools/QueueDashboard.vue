<template>
  <iframe :src="dashboardURL" frameborder="0" style="width: 60vw; height: 60vh"></iframe>
</template>

<script>
export default {
  props: {
    route: String
  },
  computed: {
    dashboardURL() {
      return `${this.route}`
    }
  }
}
</script>
