import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          
          name: 'Credentials',
          
          credentials: {
            email: { label: "Email", type: "text", placeholder: "name@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log("Inside");
            
            const res = await fetch("https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/loginSeller", {
              method: 'POST',
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            console.log("# response user")
            console.log(res.json())
      
            // If no error and we have user data, return it
            if (res.ok && user.statusCode === 200) {
              console.log("# this is user")
              console.log(user)
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],
      

      pages: {
        signIn: `${process.env.NEXT_PUBLIC_BASE_URL}/seller/signin`,
        // "/seller/signin",
      },

      callbacks: {
        async session({ session, token }) {
          // Add the user data to the session object
          session.user = token.user;
          return session;
        },
      }
});

export {handler as GET, handler as POST}