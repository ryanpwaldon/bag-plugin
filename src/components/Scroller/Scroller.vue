<template>
  <div class="flex flex-col flex-1 px-5 overflow-auto xs:px-6">
    <div class="flex-shrink-0 w-full h-5 xs:h-6" />
    <div class="relative flex-1 min-h-0">
      <slot />
    </div>
    <div class="flex-shrink-0 w-full h-5 xs:h-6" />
  </div>
</template>
