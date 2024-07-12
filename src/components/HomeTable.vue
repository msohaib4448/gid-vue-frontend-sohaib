<template>
  <div class="parent-table">
    <div class="table-wrapper">
      <TableItem />
    </div>
    <div class="actions-wrapper">
      <TableActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import TableItem from './TableItem.vue'
import TableActions from './TableActions.vue'
</script>

<style scoped>
.parent-table {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 50px;
  margin: 0 auto;
}

.table-wrapper {
  grid-column: 1;
}

.actions-wrapper {
  grid-column: 2;
}
</style>
