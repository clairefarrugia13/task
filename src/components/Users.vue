<template>
<div class="appContainer">
  <div class="usersContainer">
    <p class="usersContainer__Title">Users</p>

    <ul style="list-style-type:none" class="usersContainer__List">
      <li v-for="user in users" :key="user.id" v-on:click="getUserDetails(user.id)">
        {{ user.name }}
      </li>
    </ul>
  </div>

  <table class="detailsContainer" v-if="displayDetails">
  <tr>
    <th>Id</th>
    <td>{{selectedUser.id}}</td>
  </tr>
   <tr>
    <th>Name</th>
    <td>{{selectedUser.name}}</td>
  </tr>
   <tr>
    <th>Username</th>
    <td>{{selectedUser.username}}</td>
  </tr>
   <tr>
    <th>Email</th>
    <td>{{selectedUser.email}}</td>
  </tr>
   <tr>
    <th>Address</th>
    <td>{{selectedUserAddress}}</td>
  </tr>
   <tr>
    <th>Phone</th>
    <td>{{selectedUser.phone}}</td>
  </tr>
   <tr>
    <th>Website</th>
    <td>{{selectedUser.website}}</td>
  </tr>
   <tr>
    <th>Company</th>
    <td>{{selectedUser.company.name}}</td>
  </tr>
</table>
</div>
</template>

<script>
export default {
  data() {
    return {
      previousDisplayedUser: 0,
      displayDetails: false
    }
  },
  watch: {
 
  },
  computed: {
    users: function()
    {
      return this.$store.state.users;
    },
    selectedUser : function()
    {
      return this.$store.state.selectedUser;
    },
    selectedUserAddress : function()
    {
      return this.$store.state.selectedUserAddress;
    }
  },
  methods: {
    getUserDetails: function( userId )
    {
      if (this.previousDisplayedUser === userId && this.displayDetails)
      {
        this.displayDetails = false;
      }
      else 
      {
        this.$store.dispatch('fetchSelectedUser', userId).then(function (data)
        {
          this.displayDetails = true;
          this.previousDisplayedUser = userId;
        }.bind(this));      
        
      }
    }
  },
  created ()
  {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(async response => {

        /* check if response is successful */
        if (response.ok)
        {          
          let users = await response.json();

          /* save users list in store */
          this.$store.dispatch('usersLoaded', users);

          return Promise.resolve("Users loaded successfully");
        }

        else 
        {
          return Promise.reject(response.statusText);
        }
      })
      .catch(error => {
        console.log("error");
      })
  }
}
 
</script>

<style lang="scss" scoped>
@import "~@/assets/base.scss";
@import "~@/assets/table.scss";

.appContainer {
  width: 100%;
  height: 270px;
}

.usersContainer {
  padding: 10px;
  float: left;
  height:100%;
  width: 300px;
}

@media screen and (max-width: 600px) {
  .detailsContainer {
    background-color:lightgrey
  }
}

.usersContainer__Title {
  font: $title;
  font-weight: bold;
  color: $primary;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 10px;
}

.usersContainer__List {
  padding-left:9px;
  text-align: center;
  font: $content-font;
}

.usersContainer__List li { 
  cursor: pointer; 
}
</style>