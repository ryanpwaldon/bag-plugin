<template>
  <div class="flex flex-shrink-0 overflow-hidden whitespace-no-wrap bg-white border border-true-gray-300 rounded-lg shadow-sm">
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${require('@/assets/img/empty-cart.svg')})` }" />
    <div class="flex flex-col items-start justify-center w-full p-4 pl-0 overflow-hidden">
      <p class="text-sm font-medium leading-5 text-true-gray-900">Your cart is empty</p>
      <p class="text-xs leading-4 text-true-gray-500">Add some items to get started</p>
    </div>
  </div>
</template>
