<template>
  <div v-scroll class="flex-1 px-5 overflow-scroll">
    <div class="w-full h-5" />
    <div class="relative">
      <slot />
    </div>
    <div class="w-full h-5" />
  </div>
</template>
