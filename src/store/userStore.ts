import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:
  {
    users : [],
    selectedUser : {},
    selectedUserAddress : ""
  },
  mutations: {
    SET_USERS : function ( state, payload )
    {
      state.users = payload;
    },
    SET_SELECTED_USER : function( state, payload )
    {
      state.selectedUser = payload;
    },
    SET_SELECTED_USER_ADDRESS : function( state, payload )
    {
      state.selectedUserAddress = payload;
    }
  },
  actions: {
    usersLoaded : function ( context, users )
    {
      context.commit( "SET_USERS", users);
    },
    fetchSelectedUser : function( context, userId )
    {
      const users = context.state.users,
          selectedUser = users.find(user => user['id'] === userId);

      /* if selected user has address, format it */
      if (selectedUser && selectedUser['address'])
      {        
        context.dispatch('formatAddress', (selectedUser['address']));
      }
      
      /*store the selected user*/
      context.commit( "SET_SELECTED_USER", selectedUser );

      return selectedUser;
    },
    formatAddress : function( context, address )
    {
      let formattedAddress = "";

      /* display address properties in one line
       * if the coordinates are to be displayed, these are to be formatted on their own */
      Object.keys(address).forEach(key => {
        if (key !== "geo")
        {
          formattedAddress += address[key] + ", ";
        }
        else
        {
          formattedAddress += "(";
          Object.keys(address[key]).forEach(coord => {
            formattedAddress += address[key][coord] + ", ";
          })

          /* remove extra comma at the end, replace with closing bracket */
          formattedAddress = formattedAddress.replace(/,\s*$/, ")");
        }
      });

      context.commit( "SET_SELECTED_USER_ADDRESS", formattedAddress );

    }
  }
})

export default store
