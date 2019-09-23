<template>
  <div>
  <v-card class="sidemenu">
    <v-navigation-drawer permanent>
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="http://203.153.40.19/bct/img/user.png"></v-img>
            </v-list-item-avatar>
          
            <v-list-item-content>
              <v-list-item-title class="title">Jeremy Murphy</v-list-item-title>
              <v-list-item-subtitle style="font-size:12px">jeremyrmurphy8@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <!-- <v-btn small><v-icon>mdi-plus</v-icon> New</v-btn> -->
        <v-list-item v-on:click="changePage('inbox')">
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inbox</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="changePage('spam')">
          <v-list-item-icon>
            <v-icon>mdi-alert-decagram</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Spam</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="changePage('sent')">
          <v-list-item-icon >
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sent</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="changePage('archived')">
          <v-list-item-icon  >
            <v-icon>mdi-archive</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Archived</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    current: String
  },
  created(){
    
  },
  methods:{
    changePage(where){
      this.$emit("changePage", where);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidemenu {
  width: 17vw;
  height: 99vh;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
