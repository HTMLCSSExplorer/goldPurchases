<template>
  <div>
    <header class="flex justify-between p-10">
      <UButton label="sign out"  color="warning"/>
     <TableRowsModalNewRow/>
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
