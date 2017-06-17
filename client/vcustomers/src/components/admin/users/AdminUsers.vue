<template>
  <div class="admin container">
    <div class="row">
      <div class="well col-xs-offset-1 col-xs-10 page-navigation">
        <button class="btn-primary" @click="dialogVisible = true">Add Admin User</button>
      </div>
    </div>

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
    <div class="row">
      <el-dialog
        title="New User"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="this.handleClose">
        <input class="form-control" type="text" placeholder="Email" v-model="newUserEmail" autofocus>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addNewUser(newUserEmail)">Confirm</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        dialogVisible: false
      }
    },

    computed: {
      ...mapGetters(['adminUsers']),

      newUserEmail: {
        get() {
          return this.$store.getters.newUserEmail;

        },
        set(value) {
          this.setNewAdminUser(value);
        }
      }
    },

    methods: {
      ...mapActions([
        'getAdminUsers',
        'setNewAdminUser',
        'addNewAdmin'
      ]),

      handleClose() {
        this.dialogVisible = false;
      },

      addNewUser(email) {
        this.dialogVisible = false;
        this.addNewAdmin(email);
      }
    },

    created() {
      this.getAdminUsers();
    },

    destroyed() {
      this.newUserEmail = '';
    }
  }
</script>
<style lang="less">
  .admin {

    .page-navigation {
      text-align: right;
    }

  }
</style>
