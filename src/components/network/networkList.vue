<template>
    <div style="height: 100%;">
        <el-drawer v-model="mockVisable" title="Mock" :with-header="true" size="80%">
            <div>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="数据修改" name="1">
                        <el-form :inline="true">
                            <el-form-item label="类型">
                                <el-radio-group v-model="change_type">
                                    <el-radio :value="'Request'">请求数据</el-radio>
                                    <el-radio :value="'Response'">响应数据</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <br>
                            <el-form-item label="旧数据">
                                <el-input v-model="old_data" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            <el-form-item label="新数据">
                                <el-input v-model="new_data" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item label="操作">
                                <el-space>
                                    <el-button @click="addChange">添加</el-button>
                                    <el-button @click=saveChange>保存更改</el-button>
                                </el-space>
                            </el-form-item>
                        </el-form>
                        <br>
                        <el-table :data="change_list" style="width: 100%">
                            <el-table-column label="类型">
                                <template #default="scope">
                                    <el-tag :type="scope.row.type === 'Request' ? 'primary' : 'success'"
                                        disable-transitions>{{
                                            scope.row.type
                                        }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="old_data" label="旧数据" />
                            <el-table-column prop="new_data" label="新数据" />
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button size="small" type="danger" @click="deleteChange(scope)">
                                        Delete
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>

                </el-collapse>
            </div>
        </el-drawer>
        <el-space :size="18" style="margin-bottom: 10px;">
            <el-checkbox v-model="messageStore.capture">捕获数据</el-checkbox>
            <el-tooltip placement="top" content="Mock">
                <el-button type="primary" @click="mockVisable = true" circle><svg-icon
                        style="width: 16px; height: 16px;" iconName="icon-mock" /></el-button>
            </el-tooltip>
            <el-tooltip placement="top" content="清空">
                <el-button type="danger" @click="clearNetwork" circle><svg-icon style="width: 16px; height: 16px;"
                        iconName="icon-clear" /></el-button>
            </el-tooltip>
        </el-space>
        <el-table ref="tableRef" row-key="index" :data="messageStore.network"
            style="width: 100%;height: calc(100vh - 160px); ">
            <el-table-column prop="index" label="ID" sortable width="80" column-key="index" />
            <el-table-column prop="type" label="类型" width="100" :filters="[
                { text: '请求', value: 'Request' },
                { text: '响应', value: 'Response' },
            ]" :filter-method="filterType" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.type === 'Request' ? 'primary' : 'success'" disable-transitions>{{
                        scope.row.type
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="数据" :show-overflow-tooltip="{ popperClass: 'my-tooltip' }">
                <template #default="scope">
                    <span>{{ scope.row.data }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button @click="copy(scope.row.data)" size="small">
                        复制
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useMessageStore } from '@/store/message';
import commonUtils from '@/utils/common';
import Webview from '@/utils/webview';

const messageStore = useMessageStore()
const tableRef = ref()
const mockVisable = ref(false)
const activeNames = ref([])
const change_type = ref('Response')
const old_data = ref('')
const new_data = ref('')
const change_list = ref([])
const change_list_encode = ref([])

const addChange = () => {
    if (!new_data.value) {
        ElMessage.warning('请输入修改内容')
        return
    }
    if (!old_data.value) {
        ElMessage.warning('请输入旧数据')
        return
    }
    let old_data_stringify = encodeURIComponent(old_data.value)
    let new_data_stringify = encodeURIComponent(new_data.value)
    const uuid = commonUtils.UUID()
    change_list.value.push({
        uuid,
        old_data: old_data.value,
        new_data: new_data.value,
        type: change_type.value,
        time: commonUtils.getLocalDateTime(),
    })
    change_list_encode.value.push({
        type: change_type.value,
        old_data: old_data_stringify,
        new_data: new_data_stringify,
        uuid: uuid
    })
    new_data.value = ''
    old_data.value = ''
}

const deleteChange = (scope) => {
    const uuid = scope.row.uuid
    change_list.value = change_list.value.filter(item => item.uuid !== uuid)
    change_list_encode.value = change_list_encode.value.filter(item => item.uuid !== uuid)
}

const filterType = (value, row) => {
    return row.type === value
}

const clearNetwork = () => {
    messageStore.clearNetwork()
    ElMessage.success('清除成功')
}

const saveChange = () => {
    const request_change_list = change_list_encode.value.filter(item => item.type === 'Request').map(item => {
        return {
            uuid: item.uuid,
            type: item.type,
            value: item.value,
            old_data: item.old_data,
            new_data: item.new_data
        }
    })
    const response_change_list = change_list_encode.value.filter(item => item.type === 'Response').map(item => {
        return {
            uuid: item.uuid,
            type: item.type,
            value: item.value,
            old_data: item.old_data,
            new_data: item.new_data
        }
    })
    Webview.sendMessageToHost({
        cmd: 302,
        request: request_change_list,
        response: response_change_list
    })
}

const copy = (item) => {
    navigator.clipboard.writeText(JSON.stringify(item))
    ElMessage.success('复制成功')
}

</script>

<style scoped></style>


<style lang="css">
.my-tooltip {
    max-width: 70% !important;
}

.my-tooltip,
.my-tooltip.is-dark {
    background: rgb(48, 65, 86) !important;
    color: #ffffff !important;
    line-height: 24px;
}
</style>
