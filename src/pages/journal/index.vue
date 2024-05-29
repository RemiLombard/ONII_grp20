<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CardDiary from '@/components/CardDiary.vue';
import ButtonStat from '@/components/ButtonStat.vue';

</script>
<template>
    <section>
        <div class="flex justify-between w-full items-center">
            <h1 class="text-4xl">Vos rêves</h1>
             <RouterLink to="/journal/stats" class="text-white">  
                <ButtonStat/>
            </RouterLink>
        </div>
        <div class="flex items-center justify-between mb-6">
            <input type="text" placeholder="Rechercher des rêves" class="p-2 bg-purple-900 text-white rounded">
            <button class="p-2 bg-purple-900 text-white rounded">
                <IconSearch/>
            </button>
            <button class="p-2 bg-purple-900 text-white rounded">
                <IconSettings/>
            </button>
        </div>
        <section class="mb-8">

            <article class="">
                <CardDiary/>
            </article>
            <article class="">
                <CardDiary/>
            </article>
            <article class="">
                <CardDiary/>
            </article>
            <article class="">
                <CardDiary/>
            </article>
        </section>
    </section>
</template>