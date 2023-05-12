<template>
    <div>
        <div class="surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static sm:static">
            <img src="../images/LogoCongress.svg" alt="Image" height="50">
                <a class="cursor-pointer block lg:hidden text-700 mt-1 p-ripple">
                    <i class="pi pi-bars text-4xl"></i>
                    <span class="p-ink" role="presentation" aria-hidden="true"></span>
                </a>
            <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-6 lg:px-0 z-5 shadow-2 lg:shadow-none">
                <section></section>
                <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <button class="p-button p-component p-button-text font-bold" type="button" aria-label="Login" @click="login">
                        <span class="p-button-label">Login</span>
                        <span class="p-ink" role="presentation" aria-hidden="true"></span>
                    </button>
                    <!-- <button class="p-button p-component ml-3 p-button-outlined font-bold" type="button" aria-label="Register">
                        <span class="p-button-label">Register</span>
                        <span class="p-ink" role="presentation" aria-hidden="true"></span>
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
    const login = () =>{
        router.push('/')
    }
</script>

<style scoped>

</style>