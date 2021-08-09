export default {
    namespaced: true,
    state: {
        accessToken: null,
        client: null,
        expiry: null,
        tokenType: null,
        uid: null,
    },
    mutations: {
        storeAuthentication(state, authentication) {
            state.accessToken = authentication['access-token']
            state.client = authentication['client']
            state.expiry = authentication['expiry']
            state.tokenType = authentication['token-type']
            state.uid = authentication['uid']
        },
        resetAuthentication(state) {
            state.accessToken = null
            state.client = null
            state.expiry = null
            state.tokenType = null
            state.uid = null
        }
    },
}