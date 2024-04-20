import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from '../../../libs/connectDb';
import Admin from '@/app/models/superadmin';
import Register from '../../../models/department';

export const authOptions = ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          await connectMongoDB();
      
          const Id = credentials.userId;
          const password = credentials.password;
          let userRole;
          let id;
      
          // Find user by _id
          const user = await Register.findOne({ _id: Id });
          
          const admin = await Admin.findOne({ _id: Id });
          if (user) {
            userRole = "department";
            id = department._id;
          }else if (admin) {
            userRole = "admin";
            id = admin._id;
          }
           else {
            
            return null;
          }
      
          const isVerified = (department && department.password === password) ||(admin && admin.password === password);
      
          if (isVerified) {
            const userWithRole = {
              ...department?.toObject(), // Optional chaining to prevent errors if user is null
              // Optional chaining to prevent errors if doctor is null
              role: userRole,
              id: id
            };
            return Promise.resolve(userWithRole);
          } else {
            return null; // Return null if credentials are invalid
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      }
      
      ,
    }),
  ],
  session: {
    sessionCallback: async (session, user) => {
      session.user = { ...user, role: user.role, id: user.id }; // Add id to the session
      return Promise.resolve(session);
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = user.role;
        token.id = user.id; // Add id to the token
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.id = token.id; // Add id to the session

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Your secret should be set in your environment variables
  pages: {
    signIn: "/", // Customize the sign-in page route as needed
  },
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
