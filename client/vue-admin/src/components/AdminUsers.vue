<template>
  <div class="admin container">
    <div class="col-xs-offset-1 col-xs-10">
      <table class="table table-condensed table-bordered table-striped">
        <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in adminUsers">
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.createdAt }}</td>
          <td>{{user.updatedAt }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['adminUsers'])
    },
    methods : {
      ...mapActions([
        'getAdminUsers'

      ])
    },
    created() {
      this.getAdminUsers();
    }
  }
</script>
