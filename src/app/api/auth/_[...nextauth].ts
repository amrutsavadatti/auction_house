// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         const res = await fetch('https://zseolpzln7.execute-api.us-east-2.amazonaws.com/Initial/loginSeller', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(credentials),
//         });
//         const user = await res.json();

//         // If login is successful, return the user object
//         if (res.ok && user) {
//           return user;
//         }
//         return null; // Login failed
//       }
//     })
//   ],
//   pages: {
//     signIn: 'seller/signin', // Custom login page
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
