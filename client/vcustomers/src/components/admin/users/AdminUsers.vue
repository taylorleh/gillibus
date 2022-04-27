<template>
  <div class="admin container">
    <section class="row">
      <div class="col">
        <b-card no-block class="mb-4"
          :header-class="['bg-primary-dark-gradient', 'text-white', 'justify-content-end', 'd-flex']">
          <p class="pb-0 mb-0" slot="header">
              <button @click="dialogVisible = true" class="btn btn-sm btn-warning">Add Admin User</button>
          </p>
          <div class="card-block p-0">
            <el-table :data="adminUsers" border>
              <el-table-column width="70" prop="id" label="ID"></el-table-column>
              <el-table-column prop="username" label="Username"></el-table-column>
              <el-table-column :formatter="dateFormatter" prop="createdAt" label="Created at"></el-table-column>
              <el-table-column :formatter="dateFormatter" prop="updatedAt" label="Updated at"></el-table-column>
            </el-table>
          </div>
        </b-card>
      </div>
    </section>
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
import { bNav, bNavItem } from 'bootstrap-vue/lib/components';

export default {
  components: { bNav, bNavItem },

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
    },

    dateFormatter(row, col) {
      return moment(row[col.property]).format('MMM D, YYYY  h:mm:ss A');
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
<style lang="scss">

@import "~styles/mixins";
@import "~styles/variables";
.admin {

  .page-navigation {
    text-align: right;
  }

}
</style>
