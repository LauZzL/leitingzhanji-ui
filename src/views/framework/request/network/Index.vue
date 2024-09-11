<template>
    <div class="framework-request-network-container">
        <networkList  />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import networkList from "@/components/network/networkList.vue";

</script>

<style>
.framework-request-network-container {
    height: 100%;
}

</style>