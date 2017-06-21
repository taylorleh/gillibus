<template>
  <div>
    <div class="rule-actions" :class="{ 'form-inline': styled }">
      <div :class="{ 'form-group': styled }">
        <select v-model="selectedRule" :class="{ 'form-control': styled }">
          <option v-for="rule in rules" :value="rule">{{ rule.label }}</option>
        </select>
        <button @click="addRule" :class="{ 'btn btn-default': styled }" v-html="labels.addRule"></button>
        <button :class="{ 'btn btn-default': styled }" v-if="this.depth < this.maxDepth" @click="addGroup" v-html="labels.addGroup"></button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ConditionBuilderGroup',

    props: ['ruleTypes', 'type', 'query', 'rules'],

    computed: {},
    methods: {}
  }
</script>
<style></style>
