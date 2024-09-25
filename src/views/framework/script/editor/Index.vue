<template>
  <div style="height: 100%; width: 100%">
    <script-editor style="height: 100%;" :code="code"></script-editor>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ScriptEditor from "@/components/editor/ScriptEditor.vue";

const code = ref("function hello(){\n" +
    "  nem.logger('success', 'Hello World');\n" +
    "}\n" +
    "hello();");


</script>

<style scoped>

</style>