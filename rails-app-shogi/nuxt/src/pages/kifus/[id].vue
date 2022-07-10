<template>
  <KifuShow :id="id"/>
</template>

<script setup>
  const id = useRoute().params.id
</script>