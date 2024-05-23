<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue';
import IconBell from './icons/IconBell.vue';
import IconSettings from './icons/IconSettings.vue';
</script>

<template>
  <header >
    <div class="flex flex-col border-b border-white border-opacity-50">
        <div class="bg-slate-950 flex justify-between items-center relative p-5"> 
            <div class="">
            <RouterLink to="/">
                <IconSettings/>
            </RouterLink>
            </div>
            <div class="flex items-center space-x-4">
            <RouterLink to="/">
                <IconLogo/>
            </RouterLink>
            </div>
            <div class="">
            <RouterLink to="/">
                <IconBell/>
            </RouterLink>
            </div>
        </div>
        <nav class="flex px-5 justify-center space-x-28 lg:space-x-96">
            <RouterLink to="/journal" class="text-white border-b-2 border-transparent" active-class="text-yellow-200 pb-2 border-yellow-200">Journal</RouterLink>
            <RouterLink to="/reseau" class="text-white border-b-2 border-transparent" active-class="text-yellow-200 pb-2 border-yellow-200">Réseau</RouterLink>
        </nav>
    </div>
  </header>
</template>