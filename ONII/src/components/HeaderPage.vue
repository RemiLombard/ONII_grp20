<script setup lang="ts">

    import IconLogo from './icons/IconLogo.vue';
    import IconBell from './icons/IconBell.vue';
    import IconSettings from './icons/IconSettings.vue';

</script>

<template>

    <header class="bg-slate-950 flex justify-between items-center w-full relative p-5">
        <div class="">
            <RouterLink to="/">
                <IconSettings/>
            </RouterLink>
        </div>
        <div class="">
            <RouterLink to="/">
                <IconLogo/>
            </RouterLink>
        </div>
        <div class="">
            <RouterLink to="/">
                <IconBell/>
            </RouterLink>
        </div>
    </header>

</template>