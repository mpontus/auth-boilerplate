const login = (api: Api) => async (email, password) => {
  const response = async api.axios.post('/login', { email, password})

  const { token } = validate(response, loginResponseSchema)

  api.authStatusUpdate({
    isAuthenticated: true,
    isAnonymous: false,
    profile: profile,
  });


  api.authStatus.subscribe()

  // as opposed to

  api.emit('auth_status_change', {
    isAuthenticated: true,
    isAnonymous: false,
    profile: profile,
  });

  

  api.on('authStatusChange', {
    isAuthenticated: true,
    isAnonymous: false,
    profile: profile,
    
  })
});
