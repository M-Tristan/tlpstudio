<template>
    <div class="page">
        <tlp-header></tlp-header>
        <ModeList></ModeList>
        <div class="content">
            <div class="nodelist">
                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    default-active="1" text-color="#fff" style="border:0px">
                    <el-sub-menu index="1">
                        <template #title>
                            <span>IOT</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1" @click="createElement('start')">start</el-menu-item>
                            <el-menu-item index="1-2" @click="createElement('end')">end</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                   
                </el-menu>
            </div>
            <div class="editarea">
                <edit @getCtx = "getCtx" width="100%" height="100%" backgroundColor="lightgrey"></edit>
            </div>
        </div>
        <!-- <button @click="addNode">添加box</button>
      <button @click="createStart">添加start</button> -->


    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import edit from 'edit'
import { create } from "nodeElement";
import TlpHeader from "../../components/tlpHeader/index.vue";
import ModeList from "../../components/modeList/index.vue";
import EditStore from "edit/src/common/EditStore";
export default defineComponent({
    components: { edit, TlpHeader, ModeList },
    setup() {
        let store:EditStore 
      
        const getCtx = (editstore:EditStore) => {
          
            store = editstore
        }
        const createElement = (name:string) => {
            create(name,store)
        }
        return {   createElement ,getCtx};
    },
});
</script>
  
<style scoped>
.page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.nodelist {
    float: left;
    width: 250px;
    height: 100%;
    background-color: #545c64;

}

.content {
    position: absolute;
    top: 130px;
    left: 0;
    bottom: 0;
    right: 0;

}

.editarea {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
  