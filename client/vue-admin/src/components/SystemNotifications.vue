<template>
  <div class="container admin-notifications">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1">
        <el-alert
          v-for="message in messages"
          v-if="message.type === 'error'"
          :title="message.title"
          :key="message"
          type="error"
          :description="message.description"
          @close="close(message)"
          show-icon>
        </el-alert>
        <el-alert
          v-for="message in messages"
          v-if="message.type === 'warning'"
          :title="message.title"
          :key="message"
          type="warning"
          :description="message.description"
          @close="close(message)"
          show-icon>
        </el-alert>
        <el-alert
          v-for="message in messages"
          v-if="message.type === 'success'"
          :title="message.title"
          :key="message"
          type="success"
          :description="message.description"
          @close="close(message)"
          show-icon>
        </el-alert>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SystemNotifications',

    computed: {
      ...mapGetters({
        messages: 'messages'
      })
    },


    methods: {
      ...mapActions({
        remove: 'removeMessage'
      }),

      close(message) {
        this.remove(message);
      }

    },


    created() {

    }
  }
</script>
<style lang="less">
  .container.admin-notifications {

    margin-bottom: 1em;
  }

</style>
