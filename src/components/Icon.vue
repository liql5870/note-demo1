<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"></use>
  </svg>
</template>

<script lang="ts">

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../assets/icons', true, /|.svg$/))
} catch (err) {
  console.log(err)
}
export default {
  props: ["name"],
  name: "Icon"
}
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
