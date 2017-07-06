<template>
  <div class="admin-notifications container">
    <div class="row">
      <div class="col">
        <b-alert
          v-for="message in messages"
          v-if="message.type === 'error'"
          :key="message"
          variant="danger"
          :show="true"
          :dismissible="true"
          @dismissed="close(message)">
          <i class="fa fa-times-circle" aria-hidden="true"></i>{{message.title}}<br>
          {{message.description}}
        </b-alert>
        <b-alert
          v-for="message in messages"
          v-if="message.type === 'warning'"
          :title="message.title"
          :key="message"
          type="warning"
          :description="message.description"
          @close="close(message)"
          show-icon>
          {{message.title}}
        </b-alert>
        <b-alert
          v-for="message in messages"
          v-if="message.type === 'success'"
          :title="message.title"
          :key="message"
          type="success"
          :description="message.description"
          @close="close(message)"
          show-icon>
        </b-alert>
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
<style lang="scss">
  .container.admin-notifications {

    margin-bottom: 1em;
  }

</style>
