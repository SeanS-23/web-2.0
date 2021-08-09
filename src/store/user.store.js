export default {
    namespaced: true,
    state: {
      email: "",
      firstName: "test",
      id: 0,
      lastName: "",
      admin: false
    },
    mutations: {
      setUserDetails(state, payload) {
        state.email = payload.email;
        state.firstName = payload.first_name;
        state.id = payload.id;
        state.lastName = payload.last_name;
        state.admin = payload.admin
      },
      resetUser(state) {
        state.email = ""
        state.firstName = ""
        state.id = 0
        state.lastName = ""
        state.admin = false
      }
    }
  }