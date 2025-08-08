import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your real user lookup
        if (
          credentials?.email === "voter@example.com" &&
          credentials?.password === "password123"
        ) {
          return { id: "1", name: "Voter", email: credentials.email };
        }
        // You can also connect to a database here
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
