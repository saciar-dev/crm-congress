<template>
    
<div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
    <div class="text-center mb-5">
        <img src="../images/LogoCongress.svg" alt="Image" class="mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Bienvenidos</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
    </div>

    <div class="text-center mb-5">
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" type="text" class="lg:w-6 mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" class="lg:w-6 mb-3" />

        <div class="flex align-items-center justify-content-between mb-6">
            <div class="flex align-items-center">
                <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
            </div>
            <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
        </div>

        <div class="flex align-items-center justify-content-center ">
            <Button label="Entrar" icon="pi pi-user" class="lg:w-6" @click="login"></Button>
        </div>
        
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const checked = ref(false);
    const router = useRouter();

    const login = () =>{
        router.push('/clientes');
    }
</script>

<style scoped>
    img{
        width: 25%;
    }
</style>