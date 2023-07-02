// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.post('https://api-js401.herokuapp.com/signin', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code and json object
      ctx.status(200),
      ctx.json({
        username: 'admin',
        email: 'admin@fakeuser.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTM1OGI1NzAzOTM2MDAxODAyYThlMSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU5MDY2NTQ5LCJleHAiOjE2NTkwNzAxNDl9.efsLBIA9wqw6EFx9YuS166MjWP_7vQQkM2wrRVOLlV4',
      }),
    )
  }),
]
